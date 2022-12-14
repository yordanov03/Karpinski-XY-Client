import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { popoverMessage } from '../shared/popover-messages';

import { PaintingsService } from '../_services/paintings.service';
import { UploadService } from '../_services/upload.service';

@Component({
  selector: 'app-upload-painting',
  templateUrl: './upload-painting.component.html',
  styleUrls: ['./upload-painting.component.scss']
})
export class UploadPaintingComponent implements OnInit {
  imageURL: string | ArrayBuffer;
  progress: number;
  message: string;
  wrongFileFormat = false;
  currentImagePath$: Observable<string>;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private uploadService: UploadService,
    private paintingsService: PaintingsService,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
    if(!this.paintingsService.isInCreationMode){
      this.paintingsService.selectedCurrentPaintingPath$.subscribe((response)=>{
        this.imageURL = response
      })
    }

  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    if(files[0].type !== "image/jpeg"){
      this.toasterService.error("wrong file format");
      return;
    }

    let fileToUpload = <File>files[0];
    this.imageURL = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    //Prieview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(fileToUpload)
    //Service
    return this.uploadService.uploadImage(formData)
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) =>   popoverMessage().fire({
        icon: 'error',
      title: 'Something went wrong with uploadding the image'
      })
    });
  }
}
