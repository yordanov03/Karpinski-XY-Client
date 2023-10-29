import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ContactActions from './contact.actions';
import { ContactService } from 'src/app/api/services';
import { Store } from '@ngrx/store';
import { popoverMessage } from 'src/app/shared/popover-messages';


@Injectable()
export class ContactEffects {

  constructor(private actions$: Actions, 
    private contactService: ContactService,
    private store: Store) {}

//   submitContactForm$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(ContactActions.submitContactForm),
//     mergeMap(action => this.contactService.registerInquiry({body: action.payload}).pipe(
//       tap(() => {
//         popoverMessage().fire({
//           icon: 'success',
//           text: 'Message sent'
//         });
//       }),
//       map(() => ContactActions.submitContactFormSuccess()),
//       catchError(error => {
//         popoverMessage().fire({
//           icon: 'error',
//           text: 'Message not sent'
//         });
//         return of(ContactActions.submitContactFormFailure({ error }));
//       })
//     ))
//   )
// );
submitContactForm$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ContactActions.submitContactForm),
    mergeMap(action => this.contactService.registerInquiry({body: action.payload}).pipe(
      tap(() => {
        popoverMessage().fire({
          icon: 'success',
          text: 'Message sent'
        });
      }),
      map(() => {
        return ContactActions.submitContactFormSuccess()
      }),
      catchError(error => {
        popoverMessage().fire({
          icon: 'error',
          text: 'Message not sent'
        });
        return of(ContactActions.submitContactFormFailure({ error }));
      })
    ))
  )
);
}
