import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PaintingActions from './paintings.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Painting } from 'src/app/api/models';
import { Router } from '@angular/router';
import { PaintingsService } from 'src/app/api/services';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Injectable()
export class PaintingsEffects {
  constructor(private actions$: Actions, 
    private paintingService: PaintingsService,
    private router: Router,
    private store: Store) {}

  createPainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaintingActions.createPainting),
      tap(() => {
        Swal.fire({
          title: 'Saving',
          html: 'Please wait',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }),
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
            text: `$Painting not saved. ${error.error}`,
            showConfirmButton: true,
            timer: null
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
          text: `Failed to load painting to edit. ${error.error}`
        });
        return of(PaintingActions.loadPaintingToEditFailure({ error }));
      })
    ))
  )
);
  
  updatePainting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaintingActions.updatePainting),
      tap(() => {
        Swal.fire({
          title: 'Saving',
          html: 'Please wait',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }),
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
            text: `Painting not updated. ${error.error}`,
            showConfirmButton: true,
            timer: null
          });
          return of(PaintingActions.updatePaintingFailure({ error }))
        })
      ))
    )
  )

  deletePainting$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.deletePainting),
    tap(() => {
      Swal.fire({
        title: 'Saving',
        html: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }),
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
            text: `Failed to delete painting. ${error.error}`,
            showConfirmButton: true,
            timer: null
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
    switchMap(() =>
      this.paintingService.available().pipe(
        map(availablePaintings => 
          PaintingActions.loadAvailablePaintingsSuccess({ availablePaintings })
        ),
        catchError(error => 
          of(PaintingActions.loadAvailablePaintingsFailure({ error }))
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
            title: `Failed to load painting. ${error.error}`,
            showConfirmButton: true,
            timer: null
          });
          return of(PaintingActions.loadPaintingFailure({ error }));
        })
      )
    )
  )
);

loadPortfolio$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPortfolioPaintings),
    switchMap(() =>
      this.paintingService.portfolio().pipe(
        map(portfolioPaintings => 
          PaintingActions.loadPortfolioPaintingsSuccess({ portfolioPaintings })
        ),
        catchError(error => 
          of(PaintingActions.loadPortfolioPaintingsFailure({ error }))
        )
      )
    )
  )
);

loadPaintingsToSell$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaintingActions.loadPaintingsToSell),
    switchMap(() =>
      this.paintingService.toSell().pipe(
        map(paintingsToSell => 
          PaintingActions.loadPaintingsToSellSuccess({ paintingsToSell })
        ),
        catchError(error => 
          of(PaintingActions.loadPaintingsToSellFailure({ error }))
        )
      )
    )
  )
);
}
