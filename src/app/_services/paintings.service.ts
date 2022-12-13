import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Painting } from '../_models/painting.model';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {
  createPaintingPath = environment.apiUrl + 'paintings/create'
  availablePaintingPath = environment.apiUrl + 'paintings/available'
  paintingDetailsPath = environment.apiUrl + 'paintings/'
  deletePaintingPath = environment.apiUrl + 'paintings/'
  editPaintingPath = environment.apiUrl + 'paintings/update'

  paintingId:string;
  isInCreationMode = false;
  private currentPaintingPath$ = new BehaviorSubject<string>('');
  selectedCurrentPaintingPath$ = this.currentPaintingPath$.asObservable();

  constructor(private http: HttpClient) { }

  createPainting(data): Observable<Painting>{
    return this.http.post<Painting>(this.createPaintingPath, data);
  }

  getAvailablePaintings(): Observable<Array<Painting>>{
    return this.http.get<Array<Painting>>(this.availablePaintingPath)
  }

  getDetails(id): Observable<Painting>{
    return this.http.get<Painting>(this.paintingDetailsPath + id)
  }

  deletePainting(id){
    return this.http.delete(this.deletePaintingPath + id);
  }

  editPainting(data){
    return this.http.put<Painting>(this.editPaintingPath, data);
  }

 sendPaintingPathForEdit(path: string){
  return this.currentPaintingPath$.next(path);
 }
}
