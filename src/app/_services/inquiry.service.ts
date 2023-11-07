import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InquiryService {
postinquiryPath = environment.apiUrl + 'inquiry'

constructor(private http: HttpClient) { }

postinquiry(data): Observable<any>{
  console.log(data)
    return this.http.post(this.postinquiryPath, data);
  }
}

