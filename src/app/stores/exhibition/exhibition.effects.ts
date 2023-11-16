import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as ExhibitionActions from './exhibition.actions';
import { ExhibitionService } from 'src/app/api/services/exhibition.service'; // Adjust import path as necessary
import { popoverMessage } from 'src/app/shared/popover-messages';


@Injectable()
export class ExhibitionEffects {

  createExhibition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExhibitionActions.createExhibition),
      switchMap(action =>
        this.exhibitionService.createExhibition({ body: action.payload }).pipe(
          tap(() => {
            popoverMessage().fire({
              icon: 'success',
              text: 'Exhibition created'
            });
            setTimeout(() => {
              this.router.navigate([""]);
            }, 3000);
          }),
          map(() => ExhibitionActions.createExhibitionSuccess({payload: action.payload})),
          catchError(error => {
            popoverMessage().fire({
              icon: 'error',
              text: 'Exhibition not saved'
            });
            return of(ExhibitionActions.createExhibitionFailure({ error }))
          })
        )
      )
    )
  );

  loadExhibitions$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ExhibitionActions.loadExhibitions),
    switchMap(() =>
      this.exhibitionService.getAllExhibitions().pipe(
        map(exhibitions => ExhibitionActions.loadExhibitionsSuccess({ exhibitions })),
        catchError(error => of(ExhibitionActions.loadExhibitionsFailure({ error })))
      )
    )
  )
);

deleteExhibition$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ExhibitionActions.deleteExhibition),
    mergeMap(action =>
      this.exhibitionService.deleteExhibition({ id: action.id }).pipe(
        tap(() => {
          // Display success message
          popoverMessage().fire({
            icon: 'success',
            text: 'Exhibition successfully deleted'
          });
        }),
        map(() => ExhibitionActions.deleteExhibitionSuccess({ id: action.id })),
        catchError(error => {
          // Display error message
          popoverMessage().fire({
            icon: 'error',
            text: 'Failed to delete exhibition'
          });
          return of(ExhibitionActions.deleteExhibitionFailure({ error }));
        })
      )
    )
  )
);

getExhibition$ = createEffect(() =>
this.actions$.pipe(
  ofType(ExhibitionActions.getExhibition),
  mergeMap(action =>
    this.exhibitionService.getExhibition({ id: action.id }).pipe(
      map(exhibition => ExhibitionActions.getExhibitionSuccess({ exhibition })),
      catchError(error => of(ExhibitionActions.getExhibitionFailure({ error })))
    )
  )
)
);

  constructor(
    private actions$: Actions,
    private exhibitionService: ExhibitionService,
    private router: Router
  ) {}
}
