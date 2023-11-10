import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SubscriptionActions from './subscription.actions';
import { SubscriptionService } from 'src/app/api/services';
import { popoverMessage } from 'src/app/shared/popover-messages';


@Injectable()
export class SubscriptionEffects {

  constructor(
    private actions$: Actions,
    private subscriptionService: SubscriptionService
  ) {}

  subscribe$ = createEffect(() => this.actions$.pipe(
    ofType(SubscriptionActions.subscribe),
    mergeMap(action =>
      this.subscriptionService.subscribe(action).pipe(
        tap(() => {
          popoverMessage().fire({
            icon: 'success',
            text: 'Subscription Successful'
          });
        }),
        map(() => SubscriptionActions.subscribeSuccess()),
        catchError(error => {
          popoverMessage().fire({
            icon: 'error',
            text: 'Subscription failed'
          });
          return of(SubscriptionActions.subscribeFailure({ error }));
        })
      )
    )
  ));
}
