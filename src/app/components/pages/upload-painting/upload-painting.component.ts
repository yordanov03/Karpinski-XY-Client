import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { popoverMessage } from '../../../shared/popover-messages';

import { PaintingsService } from '../../../_services/paintings.service';
import { UploadService } from '../../../_services/upload.service';

@Component({
  selector: 'app-upload-painting',
  templateUrl: './upload-painting.component.html',
  styleUrls: ['./upload-painting.component.scss']
})
export class UploadPaintingComponent implements OnInit {
  imageURLs: string[] = [];
  progress: number;
  message: string;
  wrongFileFormat = false;
  isMainPicture: boolean = false; // Added this flag
  currentImagePath$: Observable<string>;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private uploadService: UploadService, private paintingsService: PaintingsService) { }

  ngOnInit(): void {
    if (!this.paintingsService.isInCreationMode) {
      this.paintingsService.selectedCurrentPaintingPath$.subscribe((response) => {
        // If needed, populate imageURLs here based on the response
      });
    }
  }

  public uploadFiles = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    const fileData: { file: File, isMainPicture: boolean }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      if (file.type !== "image/jpeg") {
        popoverMessage().fire({
          icon: "error",
          text: "JPEG format only"
        });
        return;
      }

      fileData.push({ file, isMainPicture: this.isMainPicture });

      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURLs.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    // Replace this with the actual painting ID
    const paintingId = 'your_actual_painting_id_here';

    // Service
    this.uploadService.uploadImages(paintingId, fileData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => popoverMessage().fire({
        icon: 'error',
        title: 'Something went wrong with uploading the images'
      })
    });
  }
}
