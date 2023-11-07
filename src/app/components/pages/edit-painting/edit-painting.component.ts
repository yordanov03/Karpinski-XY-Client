import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaintingState } from 'src/app/stores/paintings/painting.state';
import * as paintingActions from '../../../stores/paintings/painting.actions'
import * as fromSelectors from '../../../stores/paintings/painting.selectos'
import { Painting } from 'src/app/api/models';
import { Image } from 'src/app/api/models';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-painting',
  templateUrl: './edit-painting.component.html',
  styleUrls: ['./edit-painting.component.scss']
})
export class EditPaintingComponent implements OnInit {
  paintingState$: Observable<PaintingState>;
  editPaintingForm: FormGroup;
  images: Image[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ painting: PaintingState }>,
    private route: ActivatedRoute) 
    {
    this.paintingState$ = this.store.select('painting');
    this.editPaintingForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dimensions: ['', Validators.required],
      isAvailableToSell: [true],
      year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      shortDescription: ['', Validators.required],
      technique: ['', Validators.required],
      isOnFocus: [false],
      isAvailableForSale: [true],
      images: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(paintingActions.loadPaintingToEdit({ id }))
    }

    this.store.select(fromSelectors.selectPainting)
    .pipe(
      filter(painting => painting !== null),
      take(1))
    .subscribe(painting => {
      console.log(painting);
      if (painting) {
        this.editPaintingForm.patchValue({
          id: painting.id,
          name: painting.name,
          description: painting.description,
          price: painting.price,
          dimensions: painting.dimensions,
          isAvailableToSell: painting.isAvailableToSell,
          year: painting.year,
          shortDescription: painting.shortDescription,
          technique: painting.technique,
          isOnFocus: painting.isOnFocus,
          isAvailableForSale: painting.isAvailableToSell
        });

        // Load images
        this.images = painting.images.map(img => ({
          file: img.file,
          imageUrl: img.imageUrl,
          isMainImage: img.isMainImage
        }));

        this.images.forEach(image => this.addImageFormGroup(image));
      }
    });

  this.imagesFormArray.valueChanges.subscribe((images) => {
    images.forEach((image, index) => {
      this.images[index].isMainImage = image.isMainImage;
    });
  });
  }

  get imagesFormArray() {
    return (this.editPaintingForm?.get('images') as FormArray);
  }

  editPainting() {
    if (this.editPaintingForm.valid) {
      const formValue = this.preparePayload();

      // Dispatch action to edit painting
      this.store.dispatch(paintingActions.updatePainting({ painting: formValue }));
    }
  }

  preparePayload(): Painting {
    const formValue = this.editPaintingForm.getRawValue();
    formValue.images = this.images.map(image => {
      return {
        file: image.file,
        isMainImage: image.isMainImage,
        imageUrl: image.imageUrl!==null? image.imageUrl : null
      };
    });
    return formValue as Painting;
  }

  addImageFormGroup(image: any) {
    const imageFormGroup = this.fb.group({
      file: [image, Validators.required],
      isMainImage: [image.isMainImage]
    });
    this.imagesFormArray.push(imageFormGroup);
  }

  onMultipleImageUpload(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        const image: Image = {
          file: base64String,
          imageUrl: '',
          isMainImage: null
        };
        this.images.push(image);
        this.addImageFormGroup(image);
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage(index: number) {
    if (index >= 0 && index < this.images.length) {
      // Remove the image from the images array
      this.images.splice(index, 1);
  
      // Remove the FormGroup for the image from the FormArray
      this.imagesFormArray.removeAt(index);
      this.updateImagesFormArray();
    }
  }

  updateImagesFormArray() {
    // Clear the FormArray first to ensure there are no residual FormGroup entries.
    while (this.imagesFormArray.length !== 0) {
      this.imagesFormArray.removeAt(0);
    }
  
    // Now repopulate the FormArray with FormGroup instances based on the current images array.
    this.images.forEach(image => this.addImageFormGroup(image));
    console.log(this.editPaintingForm.value)
  }

  get f() {
    return this.editPaintingForm.controls;
  }
}
