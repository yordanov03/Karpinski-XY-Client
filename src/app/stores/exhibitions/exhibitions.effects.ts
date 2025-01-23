import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as ExhibitionActions from './exhibitions.actions';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Exhibition } from 'src/app/api/models';
import { ExhibitionsService } from 'src/app/api/services/exhibitions.service';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';


@Injectable()
export class ExhibitionsEffects {
  constructor(
    private actions$: Actions,
    private exhibitionsService: ExhibitionsService,
    private router: Router,
    private store: Store
  ) { }

  createExhibition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExhibitionActions.createExhibition),
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
      switchMap(action =>
        this.exhibitionsService.createExhibition({ body: action.payload }).pipe(
          tap(() => {
            popoverMessage().fire({
              icon: 'success',
              text: 'Exhibition created'
            });
            setTimeout(() => {
              this.router.navigate([""]);
            }, 3000);
          }),
          map(() => ExhibitionActions.createExhibitionSuccess({ payload: action.payload })),
          catchError(error => {
            popoverMessage().fire({
              icon: 'error',
              text: `Exhibition not saved. ${error.error}`,
              showConfirmButton: true,
              timer: null
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
        this.exhibitionsService.getAllExhibitions().pipe(
          map(exhibitions => 
            ExhibitionActions.loadExhibitionsSuccess({ exhibitions })
          ),
          catchError(error => 
            of(ExhibitionActions.loadExhibitionsFailure({ error }))
          )
        )
      )
    )
  );  
  
  deleteExhibition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExhibitionActions.deleteExhibition),
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
      mergeMap(action =>
        this.exhibitionsService.deleteExhibition({ id: action.id }).pipe(
          tap(() => {
            popoverMessage().fire({
              icon: 'success',
              text: 'Exhibition successfully deleted'
            });
          }),
          map(() => ExhibitionActions.deleteExhibitionSuccess({ id: action.id })),
          catchError(error => {
            popoverMessage().fire({
              icon: 'error',
              text: `Failed to delete exhibition. ${error.error}`,
              showConfirmButton: true,
              timer: null
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
    switchMap(action => this.exhibitionsService.getExhibition({ id: action.id }).pipe(
      map((exhibition: Exhibition) => ExhibitionActions.getExhibitionSuccess({ exhibition })),
      catchError(error => {
        popoverMessage().fire({
          icon: 'error',
          text: `Failed to load exhibition. ${error.error}`,
          showConfirmButton: true,
          timer: null
        });
        return of(ExhibitionActions.getExhibitionFailure({ error }));
      })
    ))
  )
);


  getExhibitionToEdit$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ExhibitionActions.getExhibitionToEdit),
    switchMap(action => this.exhibitionsService.getExhibitionToEdit({ id: action.id }).pipe(
      map((exhibition: Exhibition) => ExhibitionActions.getExhibitionToEditSuccess({ exhibition })),
      catchError(error => {
        popoverMessage().fire({
          icon: 'error',
          text: `Failed to load exhibition to edit. ${error.error}`,
          showConfirmButton: true,
        });
        return of(ExhibitionActions.getExhibitionToEditFailure({ error }));
      })
    ))
  )
);

  updateExhibition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExhibitionActions.updateExhibition),
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
      switchMap(action =>
        this.exhibitionsService.updateExhibition({
          body: action.exhibition
        }).pipe(
          tap(() => {
            popoverMessage().fire({
              icon: 'success',
              text: 'Exhibition updated'
            });
            setTimeout(() => {
              this.router.navigate(['/exhibitions']);
            }, 3000);
          }),
          map(() => ExhibitionActions.updateExhibitionSuccess()),
          catchError(error => {
            popoverMessage().fire({
              icon: 'error',
              text: `Exhibition not updated. ${error.error}`,
              showConfirmButton: true,
              timer: null
            });
            return of(ExhibitionActions.updateExhibitionFailure({ error }));
          })
        )
      )
    )
  );
}
