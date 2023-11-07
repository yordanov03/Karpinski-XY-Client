import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PaintingActions from './painting.actions';
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
      ofType(PaintingActions.createPainting),
      switchMap(action => this.paintingsService.create({ body: action.payload }).pipe(
        tap(() => {
        popoverMessage().fire({
          icon: 'success',
          text: 'Painting created'
        });
        setTimeout(() => {
          this.router.navigate([""])
        }, 2000);
      }
      ),
        map(() => PaintingActions.createPaintingSuccess()),
        catchError(error =>{
          popoverMessage().fire({
            icon: 'error',
            text: 'Painting not saved'
          });
          return of(PaintingActions.createPaintingFailure({ payload: error }))
        } )
      ))
    )
  );

  loadPaintingToEdit$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPaintingToEdit),
    switchMap(action => this.paintingsService.getPaintingToEdit({ id: action.id }).pipe(
      map((painting: Painting) => PaintingActions.loadPaintingToEditSuccess({ painting })),
      catchError(error => {
        popoverMessage().fire({
          icon: 'error',
          text: 'Failed to load painting to edit'
        });
        return of(PaintingActions.loadPaintingToEditFailure({ error }));
      })
    ))
  )
);
  
  updatePainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaintingActions.updatePainting),
      switchMap(action => this.paintingsService.update({ body: action.painting }).pipe(
        tap(() => {
          popoverMessage().fire({
            icon: 'success',
            text: 'Painting updated'
          });
          setTimeout(() => {
            this.router.navigate(["/paintings"])
          }, 2000);
        }),
        map(() => PaintingActions.updatePaintingSuccess()),
        catchError(error => {
          popoverMessage().fire({
            icon: 'error',
            text: 'Painting not updated'
          });
          return of(PaintingActions.updatePaintingFailure({ error }))
        })
      ))
    )
  )

  deletePainting$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.deletePainting),
    switchMap((action) =>
      this.paintingsService.delete({ id: action.id }).pipe(
        tap(() => {
          this.router.navigate(["/paintings"])
          popoverMessage().fire({
            icon: 'success',
            text: 'Painting deleted successfully'
          });
        }),
        map(() => PaintingActions.deletePaintingSuccess({ id: action.id })),
        catchError((error) => {
          popoverMessage().fire({
            icon: 'error',
            text: 'Failed to delete painting'
          });
          return of(PaintingActions.deletePaintingFailure({ error }));
        })
      )
    )
  )
);

loadAvailablePaintings$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadAvailablePaintings),
    switchMap(() => this.paintingsService.available().pipe(
      map((availablePaintings: Painting[]) => PaintingActions.loadAvailablePaintingsSuccess({ availablePaintings })),
      catchError(error => {
        console.error(error);
        popoverMessage().fire({
          icon: 'error',
          text: 'Failed to load available paintings'
        });
        return of(PaintingActions.loadAvailablePaintingsFailure({ error }));
      })
    ))
  )
);

loadPaintingsOnFocus$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPaintingsOnFocus),
    switchMap(() => this.paintingsService.onFocus().pipe(
      map((paintingsOnFocus: Painting[]) => PaintingActions.loadPaintingsOnFocusSuccess({ paintingsOnFocus })),
      catchError(error => {
        console.error(error);
        popoverMessage().fire({
          icon: 'error',
          text: 'Failed to load paintings on focus'
        });
        return of(PaintingActions.loadPaintingsOnFocusFailure({ error }));
      })
    ))
  )
);

  loadPainting$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPainting),
    switchMap(action =>
      this.paintingsService.loadPainting({ id: action.id }).pipe(
        map(response => PaintingActions.loadPaintingSuccess({ painting: response as Painting })),
        catchError(error => {
          popoverMessage().fire({
            icon: 'error',
            title: 'Error fetching painting'
          });
          return of(PaintingActions.loadPaintingFailure({ error }));
        })
      )
    )
  )
);

loadPortfolio$ = createEffect(() => this.actions$.pipe(
  ofType(PaintingActions.loadPortfolioPaintings),
  switchMap(() => this.paintingsService.portfolio().pipe(
    map(portfolioPaintings => PaintingActions.loadPortfolioPaintingsSuccess({ portfolioPaintings })),
    catchError(error => {
      popoverMessage().fire({
        icon: 'error',
        title: 'Error fetching portfolio Paintings'
      });
      return of(PaintingActions.loadPortfolioPaintingsFailure({ error }));
    })
  ))
));
}
