import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaintingState } from 'src/app/stores/paintings/painting.state';
import * as paintingActions from '../../../stores/paintings/painting.actions'
import * as fromSelectors from '../../../stores/paintings/painting.selectos'
import { Painting } from 'src/app/api/models';
import { Image } from 'src/app/api/models';


@Component({
  selector: 'app-create-painting',
  templateUrl: './create-painting.component.html',
  styleUrls: ['./create-painting.component.scss']
})
export class CreatePaintingComponent implements OnInit {
  paintingState$: Observable<PaintingState>;
  formSubmitted$: Observable<boolean>
  createPaintingForm: FormGroup;
  images: Image[] = [];

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
      images: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.images.forEach((image, index) => {
      this.addImageFormGroup(image);
    });

    this.imagesFormArray.valueChanges.subscribe((images) => {
      images.forEach((image, index) => {
        this.images[index].isMainImage = image.isMainImage;
      });
    });
  }

  get imagesFormArray() {
    return (this.createPaintingForm?.get('images') as FormArray);
  }

  createPainting() {

    if (this.createPaintingForm.valid) {
      const formValue = this.preparePayload();
      console.log(formValue.images[0].isMainImage)

      // Dispatch action to create painting
      this.store.dispatch(paintingActions.createPainting({ payload: formValue }));
    }
  }


  preparePayload(): Painting {
    const formValue = this.createPaintingForm.getRawValue();
    formValue.images = this.images.map(image => {
      return {
        file: image.file,
        isMainImage: image.isMainImage
      };
    });
    return formValue as Painting; // Type cast to Painting model
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
          isMainImage: false
        };
        this.images.push(image);
        this.addImageFormGroup(image);
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage(index: number) {
    this.images.splice(index, 1);
    this.imagesFormArray.removeAt(index);
  }

  get f() {
    return this.createPaintingForm.controls;
  }

}


