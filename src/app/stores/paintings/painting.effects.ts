import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as paintingActions from './painting.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { PaintingsService } from 'src/app/api/services';

@Injectable()
export class PaintingEffects {
  constructor(private actions$: Actions, private paintingsService: PaintingsService) {}

  createPainting$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log('Action coming in effect:', action)),
      ofType(paintingActions.createPainting),
      switchMap(action => this.paintingsService.create({ body: action.payload }).pipe(
        tap(() => {
          console.log('success')
        popoverMessage().fire({
          icon: 'success',
          text: 'Painting created'
        });
      }),
        map(() => paintingActions.createPaintingSuccess()),
        catchError(error =>{
          console.log(error)
          popoverMessage().fire({
            icon: 'error',
            text: 'Painting not saved'
          });
          return of(paintingActions.createPaintingFailure({ payload: error }))
        } )
      ))
    )
  );
}
