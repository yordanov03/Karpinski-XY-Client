import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaintingState } from 'src/app/stores/paintings/painting.state';
import * as paintingActions from '../../../stores/paintings/painting.actions'
import { Painting, PaintingImage } from 'src/app/api/models';


@Component({
  selector: 'app-create-painting',
  templateUrl: './create-painting.component.html',
  styleUrls: ['./create-painting.component.scss']
})
export class CreatePaintingComponent implements OnInit {
  paintingState$: Observable<PaintingState>;
  formSubmitted$: Observable<boolean>
  createPaintingForm: FormGroup;
  paintingImages: PaintingImage[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ painting: PaintingState }>,) {
    this.paintingState$ = this.store.select('painting');
    this.createPaintingForm = this.fb.group({
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
      paintingImages: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.paintingImages.forEach((image, index) => {
      this.addImageFormGroup(image);
    });

    this.paintingImagesFormArray.valueChanges.subscribe((images) => {
      images.forEach((image, index) => {
        this.paintingImages[index].isMainImage = image.isMainImage;
      });
    });
  }

  get paintingImagesFormArray() {
    return (this.createPaintingForm?.get('paintingImages') as FormArray);
  }

  createPainting() {
    console.log(this.createPaintingForm.value)
    if (this.createPaintingForm.valid) {
      const formValue = this.preparePayload();
      this.store.dispatch(paintingActions.createPainting({ payload: formValue }));
    }
  }


  preparePayload(): Painting {
    const formValue = this.createPaintingForm.getRawValue();
    formValue.paintingImages = this.paintingImages.map(paintingImage => {
      return {
        file: paintingImage.file,
        isMainImage: paintingImage.isMainImage
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
          imageUrl: '',
          isMainImage: false
        };
        this.paintingImages.push(image);
        this.addImageFormGroup(image);
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage(index: number) {
    this.paintingImages.splice(index, 1);
    this.paintingImagesFormArray.removeAt(index);
  }

  get f() {
    return this.createPaintingForm.controls;
  }

}


