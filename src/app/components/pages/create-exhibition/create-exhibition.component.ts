import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exhibition, ExhibitionImage } from 'src/app/api/models';
import * as exhibitionActions from '../../../stores/exhibition/exhibition.actions';
import { ExhibitionState } from 'src/app/stores/exhibition/exhibition.state';

@Component({
  selector: 'app-create-exhibition',
  templateUrl: './create-exhibition.component.html',
  styleUrls: ['./create-exhibition.component.scss']
})
export class CreateExhibitionComponent implements OnInit {
  exhibitionState$: Observable<ExhibitionState>;
  createExhibitionForm: FormGroup;
  exhibitionImages: ExhibitionImage[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ exhibition: ExhibitionState }>) {
    this.exhibitionState$ = this.store.select('exhibition');
    this.createExhibitionForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      longDescription: [''],
      shortDescription: ['', Validators.required],
      organizer: [''],
      link: [''],
      exhibitionImages: this.fb.array([], Validators.required)
    });
 }

 ngOnInit(): void {
  this.exhibitionImages.forEach((image, index) => {
    this.addImageFormGroup(image);
  });

  this.exhibitionImagesFormArray.valueChanges.subscribe((images) => {
    images.forEach((image, index) => {
      this.exhibitionImages[index].isMainImage = image.isMainImage;
    });
  });
 }

 get exhibitionImagesFormArray() {
  return (this.createExhibitionForm.get('exhibitionImages') as FormArray);
}

createExhibition() {
  if (this.createExhibitionForm.valid) {
    const formValue = this.preparePayload();
    this.store.dispatch(exhibitionActions.createExhibition({ payload: formValue }));
  }
}

preparePayload(): Exhibition {
  const formValue = this.createExhibitionForm.getRawValue();
  formValue.exhibitionImages = this.exhibitionImages.map(exhibitionImage => {
    return {
      file: exhibitionImage.file,
      isMainImage: exhibitionImage.isMainImage
    };
  });
  return formValue as Exhibition;
}

addImageFormGroup(exhibitionImage: ExhibitionImage) {
  const imageFormGroup = this.fb.group({
    file: [exhibitionImage.file, Validators.required],
    isMainImage: [exhibitionImage.isMainImage]
  });
  this.exhibitionImagesFormArray.push(imageFormGroup);
}

onMultipleImageUpload(event: any) {
  const files: FileList = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64String = e.target.result.split(',')[1];
      const image: ExhibitionImage = {
        file: base64String,
        imageUrl: '',
        isMainImage: false
      };
      this.exhibitionImages.push(image);
      this.addImageFormGroup(image);
    };
    reader.readAsDataURL(file);
  }
}

onDeleteImage(index: number) {
  this.exhibitionImages.splice(index, 1);
  this.exhibitionImagesFormArray.removeAt(index);
}

get f() {
  return this.createExhibitionForm.controls;
}
}

