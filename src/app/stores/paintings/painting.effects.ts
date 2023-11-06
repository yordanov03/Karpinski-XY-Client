import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as paintingActions from './painting.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { PaintingsService } from 'src/app/api/services';
import { Painting } from 'src/app/api/models';
import { Router } from '@angular/router';

@Injectable()
export class PaintingEffects {
  constructor(private actions$: Actions, 
    private paintingsService: PaintingsService,
    private router: Router) {}

  createPainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paintingActions.createPainting),
      switchMap(action => this.paintingsService.create({ body: action.payload }).pipe(
        tap(() => {
          this.router.navigate([""])
        popoverMessage().fire({
          icon: 'success',
          text: 'Painting created'
        });
      }
      ),
        map(() => paintingActions.createPaintingSuccess()),
        catchError(error =>{
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
          this.router.navigate(["/paintings"])
          popoverMessage().fire({
            icon: 'success',
            text: 'Painting updated'
          });
        }),
        map(() => paintingActions.updatePaintingSuccess()),
        catchError(error => {
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
        popoverMessage().fire({
          icon: 'error',
          text: 'Failed to load painting'
        });
        return of(paintingActions.loadPaintingFailure({ error }));
      })
    ))
  )
);

loadAvailablePaintings$ = createEffect(() =>
  this.actions$.pipe(
    ofType(paintingActions.loadAvailablePaintings),
    switchMap(() => this.paintingsService.available().pipe(
      map((availablePaintings: Painting[]) => paintingActions.loadAvailablePaintingsSuccess({ availablePaintings })),
      catchError(error => {
        console.error(error);
        popoverMessage().fire({
          icon: 'error',
          text: 'Failed to load available paintings'
        });
        return of(paintingActions.loadAvailablePaintingsFailure({ error }));
      })
    ))
  )
);

loadPaintingsOnFocus$ = createEffect(() =>
  this.actions$.pipe(
    ofType(paintingActions.loadPaintingsOnFocus),
    switchMap(() => this.paintingsService.onFocus().pipe(
      map((paintingsOnFocus: Painting[]) => paintingActions.loadPaintingsOnFocusSuccess({ paintingsOnFocus })),
      catchError(error => {
        console.error(error);
        popoverMessage().fire({
          icon: 'error',
          text: 'Failed to load paintings on focus'
        });
        return of(paintingActions.loadPaintingsOnFocusFailure({ error }));
      })
    ))
  )
);

deletePainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paintingActions.deletePainting),
      switchMap((action) =>
        this.paintingsService.delete({ id: action.id }).pipe(
          tap(() => {
            this.router.navigate(["/paintings"])
            popoverMessage().fire({
              icon: 'success',
              text: 'Painting deleted successfully'
            });
          }),
          map(() => paintingActions.deletePaintingSuccess({ id: action.id })),
          catchError((error) => {
            popoverMessage().fire({
              icon: 'error',
              text: 'Failed to delete painting'
            });
            return of(paintingActions.deletePaintingFailure({ error }));
          })
        )
      )
    )
  );
}
