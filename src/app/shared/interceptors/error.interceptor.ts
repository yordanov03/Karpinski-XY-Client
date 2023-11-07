import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { popoverMessage } from '../popover-messages';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError(err => {
        let message= err.statusText;

        if(err.status===400){
          message ="Client error"
        }
        else if(err.status === 401){
          message = "Wrong credentials or non-existing user"
        }
        else if(err.status === 403){
          message = "You do not have permissions to access this"
        }
        else if(err.status===404){
          message ="Not found"
        }
        else if(err.status===500){
          message ="Internal Server error"
        }
        else if(err.status===503){
          message ="Server could not handle teh request"
        }
        
        else{
          //global message
          message = "Unexpected error"
        }
        popoverMessage().fire({
                icon:"error",
                text:`${message}`
              })
        return throwError(err)
      })
    )
  }
}
