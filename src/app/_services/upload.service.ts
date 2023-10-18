import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private createPaintingPath = environment.apiUrl + 'upload';

  constructor(private http: HttpClient) { }

  uploadImages(paintingId: string, fileData: { file: File, isMainPicture: boolean }[]): Observable<any> {
    const formData = new FormData();
    
    // Loop through the file data array and append each file and its associated flag to the form data
    for (let i = 0; i < fileData.length; i++) {
      formData.append(`file${i}`, fileData[i].file, fileData[i].file.name);
      formData.append(`isMainPicture${i}`, fileData[i].isMainPicture.toString());
    }

    return this.http.post(`${this.createPaintingPath}/${paintingId}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }
}
