import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Exhibition, ExhibitionImage } from 'src/app/api/models';
import { ExhibitionState } from 'src/app/stores/exhibition/exhibition.state';
import * as exhibitionActions from '../../../stores/exhibition/exhibition.actions';
import * as fromSelectors from '../../../stores/exhibition/exhibition.selectors';

@Component({
  selector: 'app-edit-exhibition',
  templateUrl: './edit-exhibition.component.html',
  styleUrls: ['./edit-exhibition.component.scss']
})
export class EditExhibitionComponent implements OnInit {
  exhibitionState$: Observable<ExhibitionState>;
  private destroy$ = new Subject<void>();
  editExhibitionForm: FormGroup;
  exhibitionImages: ExhibitionImage[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ exhibition: ExhibitionState }>,
    private route: ActivatedRoute) {
      this.exhibitionState$ = this.store.select('exhibition');

    this.editExhibitionForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      longDescription: [''],
      organizer: [''],
      link: [''],
      exhibitionImages: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(exhibitionActions.getExhibitionToEdit({ id }));
    }

    this.store.select(fromSelectors.selectExhibition)
      .pipe(
        filter(exhibition => exhibition !== null),
        take(1))
      .subscribe(exhibition => {
        console.log(exhibition)
        if (exhibition) {
          console.log(this.exhibitionImages)
          this.exhibitionImages = [];
          while (this.exhibitionImagesFormArray.length !== 0) {
            this.exhibitionImagesFormArray.removeAt(0);
          }

          this.editExhibitionForm.patchValue({
            id: exhibition.id,
            title: exhibition.title,
            startDate: this.formatDate(exhibition.startDate),
            endDate: this.formatDate(exhibition.endDate),
            location: exhibition.location,
            longDescription: exhibition.longDescription,
            organizer: exhibition.organizer,
            link: exhibition.link
          });

          // this.exhibitionImages = exhibition.exhibitionImages;
          // this.updateImagesFormArray();
          // Load images
        this.exhibitionImages = exhibition.exhibitionImages.map(img => ({
          file: img.file,
          imagePath: img.imagePath,
          isMainImage: img.isMainImage,
          fileName: img.fileName
        }));
        this.exhibitionImages.forEach(image => this.addImageFormGroup(image));
        console.log(this.editExhibitionForm.value)
      } 
      });

      this.exhibitionImagesFormArray.valueChanges.subscribe((images) => {
        images.forEach((image, index) => {
          this.exhibitionImages[index].isMainImage = image.isMainImage;
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get exhibitionImagesFormArray() {
    return (this.editExhibitionForm.get('exhibitionImages') as FormArray);
  }

  editExhibition() {
    if (this.editExhibitionForm.valid) {
      const formValue = this.preparePayload()
      console.log(formValue)
      this.store.dispatch(exhibitionActions.updateExhibition({ exhibition: formValue }));
    }
  }

  preparePayload(): Exhibition {
    const formValue = this.editExhibitionForm.getRawValue();
    formValue.exhibitionImages = this.exhibitionImages.map(image => {
      return {
        file: image.file,
        isMainImage: image.isMainImage==null? false: image.isMainImage,
        imagePath: image.imagePath!==null? image.imagePath : null,
        fileName: image.fileName
      };
    });
    return formValue as Exhibition;
  }

  addImageFormGroup(exhibitionImage: any) {
    const imageFormGroup = this.fb.group({
      file: [exhibitionImage, Validators.required],
      isMainImage: [exhibitionImage.isMainImage],
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
          imagePath: '', // Set URL if available
          isMainImage: false,
          fileName: file.name
        };
        this.exhibitionImages.push(image);
        this.addImageFormGroup(image);
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage(index: number) {
    if (index >= 0 && index < this.exhibitionImages.length) {
      // Remove the image from the images array
      this.exhibitionImages.splice(index, 1);
  
      // Remove the FormGroup for the image from the FormArray
      this.exhibitionImagesFormArray.removeAt(index);
      this.updateImagesFormArray();
    }
    console.log(this.exhibitionImagesFormArray.value)
  }

  updateImagesFormArray() {
    while (this.exhibitionImagesFormArray.length !== 0) {
      this.exhibitionImagesFormArray.removeAt(0);
    }
    this.exhibitionImages.forEach(image => this.addImageFormGroup(image));
  }

  get f() {
    return this.editExhibitionForm.controls;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];  // Converts to "yyyy-MM-dd" format
  }
}
