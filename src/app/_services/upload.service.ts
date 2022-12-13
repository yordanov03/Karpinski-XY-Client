import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Painting } from '../_models/painting.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  createPaintingPath = environment.apiUrl + 'upload'

  constructor(private http: HttpClient) { }

  uploadImage(data): Observable<any>{
    return this.http.post(this.createPaintingPath, data, {reportProgress: true, observe: 'events'});
  }
}