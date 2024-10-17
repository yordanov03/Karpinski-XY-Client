import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaintingState } from 'src/app/stores/painting/painting.state';
import * as paintingActions from '../../../stores/painting/painting.actions'
import * as fromSelectors from '../../../stores/painting/painting.selectos'
import { Painting, PaintingImage } from 'src/app/api/models';
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
  paintingImages: PaintingImage[] = [];

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
      technique: ['', Validators.required],
      isOnFocus: [false],
      isAvailableForSale: [true],
      paintingImages: this.fb.array([], Validators.required)
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
      if (painting) {
        this.editPaintingForm.patchValue({
          id: painting.id,
          name: painting.name,
          description: painting.description,
          price: painting.price,
          dimensions: painting.dimensions,
          isAvailableToSell: painting.isAvailableToSell,
          year: painting.year,
          technique: painting.technique,
          isOnFocus: painting.isOnFocus,
          isAvailableForSale: painting.isAvailableToSell
        });

        // Load images
        this.paintingImages = painting.paintingImages.map(img => ({
          file: img.file,
          imagePath: img.imagePath,
          isMainImage: img.isMainImage,
          fileName: img.fileName
        }));
        console.log(this.editPaintingForm.value)
        this.paintingImages.forEach(image => this.addImageFormGroup(image));
      }
    });

  this.paintingImagesFormArray.valueChanges.subscribe((images) => {
    images.forEach((image, index) => {
      this.paintingImages[index].isMainImage = image.isMainImage;
    });
  });
  }

  get paintingImagesFormArray() {
    return (this.editPaintingForm?.get('paintingImages') as FormArray);
  }

  editPainting() {
    if (this.editPaintingForm.valid) {
      const formValue = this.preparePayload();

      this.store.dispatch(paintingActions.updatePainting({ painting: formValue }));
    }
  }

  preparePayload(): Painting {
    const formValue = this.editPaintingForm.getRawValue();
    formValue.paintingImages = this.paintingImages.map(image => {
      return {
        file: image.file,
        isMainImage: image.isMainImage==null? false: image.isMainImage,
        imagePath: image.imagePath!==null? image.imagePath : null,
        fileName: image.fileName
      };
    });
    return formValue as Painting;
  }

  addImageFormGroup(paintingImage: any) {
    const imageFormGroup = this.fb.group({
      file: [paintingImage, Validators.required],
      isMainImage: [paintingImage.isMainImage]
    });
    this.paintingImagesFormArray.push(imageFormGroup);
  }

  onMultipleImageUpload(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        const image: PaintingImage = {
          file: base64String,
          imagePath: '',
          isMainImage: null,
          fileName: file.name
        };
        this.paintingImages.push(image);
        this.addImageFormGroup(image);
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage(index: number) {
    if (index >= 0 && index < this.paintingImages.length) {
      // Remove the image from the images array
      this.paintingImages.splice(index, 1);
  
      // Remove the FormGroup for the image from the FormArray
      this.paintingImagesFormArray.removeAt(index);
      this.updateImagesFormArray();
    }
  }

  updateImagesFormArray() {
    // Clear the FormArray first to ensure there are no residual FormGroup entries.
    while (this.paintingImagesFormArray.length !== 0) {
      this.paintingImagesFormArray.removeAt(0);
    }
  
    // Repopulate the FormArray with FormGroup instances based on the current images array.
    this.paintingImages.forEach(image => this.addImageFormGroup(image));
    console.log(this.editPaintingForm.value)
  }

  get f() {
    return this.editPaintingForm.controls;
  }
}
