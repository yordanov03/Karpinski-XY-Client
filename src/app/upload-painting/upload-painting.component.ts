import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
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

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient,
    private uploadService: UploadService,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    console.log(files[0].target)
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
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }


}
