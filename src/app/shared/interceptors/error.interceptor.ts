import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
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
    // return next.handle(request).pipe(
    //   catchError((error) => {
    //     if (error instanceof HttpErrorResponse) {
    //       if (error.error instanceof ErrorEvent) {

    //         console.log('Error Event');
    //       } else {
    //         console.log(error)
    //         switch (error.status) {
    //           case 400: // Bad request
    //           popoverMessage().fire({
    //             icon:"error",
    //             title:'Client Error',
    //             text:`${error.statusText}`
    //           })
    //           break;

    //           case 401: // Unautorized
    //               popoverMessage().fire({
    //             icon:"error",
    //             title:'Authorization Error',
    //             text:`${error.statusText}`
    //           })
    //             break;

    //           case 403: // Forbidden
    //           popoverMessage().fire({
    //             icon:"error",
    //             title:'Access error',
    //             text:`${error.statusText}`
    //           })
    //             break;

    //           case 404: // Not found
    //           popoverMessage().fire({
    //             icon:"error",
    //             title:'Not found',
    //             text:`${error.statusText}`
    //           })
    //             break;

    //             case 500: // Internal server error
    //             popoverMessage().fire({
    //               icon:"error",
    //               title:'Server error',
    //               text:`${error.statusText}`
    //             })
    //             break;
                
    //           case 503: // Server cannot handle request
    //           popoverMessage().fire({
    //             icon:"error",
    //             title:'Server cannot handle the request',
    //             text:`${error.statusText}`
    //           })
    //             break;
    //         }
    //       }
    //     } else {
    //       console.log('An error occurred');
    //     }
    //     return throwError(
    //       popoverMessage().fire({
    //       icon:"error",
    //       title:'Something went wrong',
    //       text:`${error.statusText}`,
    //         showConfirmButton: true,
    //         confirmButtonColor:'#3cd1ff',
    //         timer: Swal.stopTimer()
    //     }));
    //   })
    // );
  }
}
