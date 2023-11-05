import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as paintingActions from './painting.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { PaintingsService } from 'src/app/api/services';
import { Painting } from 'src/app/api/models';

@Injectable()
export class PaintingEffects {
  constructor(private actions$: Actions, private paintingsService: PaintingsService) {}

  createPainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paintingActions.createPainting),
      switchMap(action => this.paintingsService.create({ body: action.payload }).pipe(
        tap(() => {
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
  
  updatePainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paintingActions.updatePainting),
      switchMap(action => this.paintingsService.update({ body: action.painting }).pipe(
        tap(() => {
          console.log('success');
          popoverMessage().fire({
            icon: 'success',
            text: 'Painting updated'
          });
        }),
        map(() => paintingActions.updatePaintingSuccess()),
        catchError(error => {
          console.log(error);
          popoverMessage().fire({
            icon: 'error',
            text: 'Painting not updated'
          });
          return of(paintingActions.updatePaintingFailure({ error }))
        })
      ))
    )
  )

  loadPainting$ = createEffect(() =>
  this.actions$.pipe(
    ofType(paintingActions.loadPainting),
    switchMap(action => this.paintingsService.getPaintingToEdit({ id: action.id }).pipe(
      map((painting: Painting) => paintingActions.loadPaintingSuccess({ painting })),
      catchError(error => {
        console.error(error);
        popoverMessage().fire({
          icon: 'error',
          text: 'Failed to load painting'
        });
        return of(paintingActions.loadPaintingFailure({ error }));
      })
    ))
  )
);
}
