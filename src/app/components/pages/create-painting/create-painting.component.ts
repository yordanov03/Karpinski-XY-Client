import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaintingState } from 'src/app/stores/paintings/painting.state';
import * as paintingActions from '../../../stores/paintings/painting.actions'
import * as fromSelectors from '../../../stores/paintings/painting.selectos'
import { Painting } from 'src/app/api/models';


@Component({
  selector: 'app-create-painting',
  templateUrl: './create-painting.component.html',
  styleUrls: ['./create-painting.component.scss']
})
export class CreatePaintingComponent implements OnInit {
  paintingState$: Observable<PaintingState>;
  formSubmitted$: Observable<boolean>
  createPaintingForm: FormGroup;
  images: any[] = [];

constructor(
  private fb: FormBuilder,
  private store: Store<{ painting: PaintingState }>,) 
  {
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
    isOnFocus:[false],
    isAvailableForSale:[true],
    images: this.fb.array([], Validators.required)
  });
}

  ngOnInit(): void {
    this.formSubmitted$ = this.store.select(fromSelectors.selectFormSubmitted)
    this.images.forEach((image, index) => {
      this.addImageFormGroup(image);
    });
  }

  get imagesFormArray() {
    return (this.createPaintingForm?.get('images') as FormArray);
  }

createPainting(){
  // if (this.createPaintingForm.valid) {
  //   const formData = new FormData();

  //   // Populate formData with form values
  //   Object.keys(this.createPaintingForm.controls).forEach(key => {
  //     formData.append(key, this.createPaintingForm.get(key)?.value);
  //   });

  //   // Add images to formData
  //   this.images.forEach((imageSrc, index) => {
  //     formData.append(`images[${index}]`, imageSrc);
  //   });

  //   // Dispatch action to create painting
  //   this.store.dispatch(paintingActions.createPainting({ payload: formData }));
  //   console.log(formData.)
  //   console.log('pratih')
  // }
  // if (this.createPaintingForm.valid) {
  //   // Get form values as JSON object
  //   const formValue = this.createPaintingForm.value;
  
  //   // Maybe add additional fields like images if needed
  //   formValue.images = this.images;
  
  //   // Dispatch action to create painting
  //   this.store.dispatch(paintingActions.createPainting({ payload: formValue }));

  if (this.createPaintingForm.valid) {
    const formValue = this.preparePayload();
    
    // Dispatch action to create painting
    this.store.dispatch(paintingActions.createPainting({ payload: formValue }));
  }
    console.log('pratih');
  }
  // console.log(this.createPaintingForm.valid)
  // console.log(this.createPaintingForm.value)
  // console.log(this.createPaintingForm.value['images'][0])

  preparePayload(): Painting {
    // Get form values
    const formValue = this.createPaintingForm.getRawValue();
  
    // Add additional fields like images if needed
    formValue.paintingPictures = this.images.map(image => {
      return {
        imageUrl: image.url, // Assuming 'url' is a property in your image object
        isMainPicture: image.isMain // Assuming 'isMain' is a property in your image object
      };
    });
  
    return formValue as Painting; // Type cast to Painting model
  }

addImageFormGroup(image: any) {
  const imageFormGroup = this.fb.group({
    url: [image.url],
    isMain: [image.isMain]
  });

  this.imagesFormArray.push(imageFormGroup);
}

// Add this to your component.ts
// triggerImageUpload() {
//   const fileInput = document.getElementById('multiImageUpload') as HTMLInputElement;
//   fileInput.click();
// }


onMultipleImageUpload(event: any) {
  const files: FileList = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = { url: e.target.result, isMain: false };
      this.images.push(image);
      this.addImageFormGroup(image);
    };
    reader.readAsDataURL(file);
  }
  console.log(this.createPaintingForm.value['images'].length)
  console.log(this.images.length)
}

onDeleteImage(index: number) {
  this.images.splice(index, 1);
  this.imagesFormArray.removeAt(index);
  console.log(this.createPaintingForm.value['images'][0])
  console.log(this.images.length)
}
  
get f(){
  return this.createPaintingForm.controls;
}

}


