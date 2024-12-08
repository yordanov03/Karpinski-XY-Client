import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PaintingActions from './paintings.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Painting } from 'src/app/api/models';
import { Router } from '@angular/router';
import { PaintingsService } from 'src/app/api/services';
import { select, Store } from '@ngrx/store';
import { selectAvailablePaintings, selectPaintingsToSell, selectPortfolioPaintings } from './paintings.selectos';

@Injectable()
export class PaintingsEffects {
  constructor(private actions$: Actions, 
    private paintingService: PaintingsService,
    private router: Router,
    private store: Store) {}

  createPainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaintingActions.createPainting),
      switchMap(action => this.paintingService.create({ body: action.payload }).pipe(
        tap(() => {
        popoverMessage().fire({
          icon: 'success',
          text: 'Painting created'
        });
        setTimeout(() => {
          this.router.navigate([""])
        }, 3000);
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
    switchMap(action => this.paintingService.getPaintingToEdit({ id: action.id }).pipe(
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
      switchMap(action => this.paintingService.update({ body: action.painting }).pipe(
        tap(() => {
          popoverMessage().fire({
            icon: 'success',
            text: 'Painting updated'
          });
          setTimeout(() => {
            this.router.navigate(["/"])
          }, 3000);
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
      this.paintingService.delete({ id: action.id }).pipe(
        tap(() => {
          this.router.navigateByUrl(this.router.url);
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
    ofType(PaintingActions.loadAvailablePaintings), // Trigger on loadAvailablePaintings action
    switchMap(() =>
      this.paintingService.available().pipe(
        map(availablePaintings => 
          PaintingActions.loadAvailablePaintingsSuccess({ availablePaintings }) // Dispatch success action
        ),
        catchError(error => 
          of(PaintingActions.loadAvailablePaintingsFailure({ error })) // Dispatch failure action
        )
      )
    )
  )
);

loadPaintingsOnFocus$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPaintingsOnFocus),
    switchMap(() => this.paintingService.onFocus().pipe(
      map((paintingsOnFocus: Painting[]) => PaintingActions.loadPaintingsOnFocusSuccess({ paintingsOnFocus })),
      catchError(error => {
        return of(PaintingActions.loadPaintingsOnFocusFailure({ error }));
      })
    ))
  )
);

  loadPainting$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPainting),
    switchMap(action =>
      this.paintingService.loadPainting({ id: action.id }).pipe(
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

loadPortfolio$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPortfolioPaintings), // Trigger on loadPortfolioPaintings action
    switchMap(() =>
      this.paintingService.portfolio().pipe(
        map(portfolioPaintings => 
          PaintingActions.loadPortfolioPaintingsSuccess({ portfolioPaintings }) // Dispatch success action
        ),
        catchError(error => 
          of(PaintingActions.loadPortfolioPaintingsFailure({ error })) // Dispatch failure action
        )
      )
    )
  )
);

loadPaintingsToSell$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPaintingsToSell), // Trigger on loadPaintingsToSell action
    switchMap(() =>
      this.paintingService.toSell().pipe(
        map(paintingsToSell => 
          PaintingActions.loadPaintingsToSellSuccess({ paintingsToSell }) // Dispatch success action with fetched paintings
        ),
        catchError(error => 
          of(PaintingActions.loadPaintingsToSellFailure({ error })) // Dispatch failure action if API call fails
        )
      )
    )
  )
);
}
