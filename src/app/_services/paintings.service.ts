import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Painting } from '../_models/painting,model';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {
  createPaintingPath = environment.apiUrl + 'paintings/create'

  constructor(private http: HttpClient) { }

  createPainting(data): Observable<Painting>{
    return this.http.post<Painting>(this.createPaintingPath, data);
  }
}
