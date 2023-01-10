import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InqueryService {
postInqueryPath = environment.apiUrl + 'inquery'

constructor(private http: HttpClient) { }

postInquery(data): Observable<any>{
  console.log(data)
    return this.http.post(this.postInqueryPath, data);
  }
}

