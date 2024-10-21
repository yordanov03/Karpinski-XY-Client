import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PaintingActions from './painting.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Painting } from 'src/app/api/models';
import { Router } from '@angular/router';
import { PaintingsService } from 'src/app/api/services';
import { select, Store } from '@ngrx/store';
import { selectAvailablePaintings, selectPaintingsToSell, selectPortfolioPaintings } from './painting.selectos';

@Injectable()
export class PaintingEffects {
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
            this.router.navigate(["/paintings"])
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
    ofType(PaintingActions.loadAvailablePaintings), // Trigger on loadAvailablePaintings action
    withLatestFrom(this.store.pipe(select(selectAvailablePaintings))), // Combine with the current state of available paintings
    switchMap(([action, availablePaintings]) => {
      if (availablePaintings.length === 0) { // Only fetch from the backend if there are no available paintings in the state
        return this.paintingService.available().pipe(
          map((availablePaintings: Painting[]) => 
            PaintingActions.loadAvailablePaintingsSuccess({ availablePaintings }) // Dispatch success action with fetched available paintings
          ),
          catchError(error => 
            of(PaintingActions.loadAvailablePaintingsFailure({ error })) // Dispatch failure action if API call fails
          )
        );
      } else {
        return EMPTY; // Do nothing if available paintings are already in the state
      }
    })
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
    withLatestFrom(this.store.pipe(select(selectPortfolioPaintings))), // Combine with the current state of portfolio paintings
    switchMap(([action, portfolioPaintings]) => {
      if (portfolioPaintings.length === 0) { // Only fetch from the backend if there are no portfolio paintings in the state
        return this.paintingService.portfolio().pipe(
          map(portfolioPaintings => 
            PaintingActions.loadPortfolioPaintingsSuccess({ portfolioPaintings }) // Dispatch success action with fetched portfolio paintings
          ),
          catchError(error => 
            of(PaintingActions.loadPortfolioPaintingsFailure({ error })) // Dispatch failure action if API call fails
          )
        );
      } else {
        return EMPTY; // Do nothing if portfolio paintings are already in the state
      }
    })
  )
);


loadPaintingsToSell$ = createEffect(() => 
  this.actions$.pipe(
    ofType(PaintingActions.loadPaintingsToSell), // Trigger on loadPaintingsToSell action
    withLatestFrom(this.store.pipe(select(selectPaintingsToSell))), // Combine with the current state of paintings to sell
    switchMap(([action, paintingsToSellCount]) => {
      if (paintingsToSellCount.length === 0) { // Only fetch from the backend if there are no paintings to sell in the state
        return this.paintingService.toSell().pipe(
          map(paintingsToSell => 
            PaintingActions.loadPaintingsToSellSuccess({ paintingsToSell }) // Dispatch success action with fetched paintings
          ),
          catchError(error => 
            of(PaintingActions.loadPaintingsToSellFailure({ error })) // Dispatch failure action if API call fails
          )
        );
      } else {
        return EMPTY; // Do nothing if paintings are already in the state
      }
    })
  )
);
}
