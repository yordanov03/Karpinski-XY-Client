import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { IdentityService } from 'src/app/api/services';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private identityService: IdentityService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap(action =>
      this.identityService.login({body: action.payload}).pipe(
        tap(user => {
          // Handle the success case
          this.jwtService.setToken(user.token);
          popoverMessage().fire({
            icon: 'success',
            text: 'Hello, my love'
          });
          setTimeout(() => this.router.navigate(['']), 2000);
        }),
        map(user => AuthActions.loginSuccess({ user })),
        catchError(error => {
          // Handle the error case
          popoverMessage().fire({
            icon: 'error',
            text: 'Could not log you in'
          });
          return of(AuthActions.loginFailure({ error }));
        })
      )
    )
  ));


  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.jwtService.clearToken();
      setTimeout(() => {
        popoverMessage().fire({
          icon: 'success',
          text: 'Bye Pawliushko'
        });
      }, 2000);
      this.router.navigate(['/']);
    }),
    map(() => AuthActions.logoutSuccess()),
    catchError(error => {
      popoverMessage().fire({
        icon: 'error',
        text: 'Logout failed'
      });
      return of(AuthActions.logoutFailure({ error }));
    })
  )
);

register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.identityService.regsiter({ body: action.payload }).pipe(
          tap(() => {
            popoverMessage().fire({
              icon: 'success',
              text: 'Registration Successful'
            });
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
          }),
          map(() => AuthActions.registerSuccess()),
          catchError(error => {
            popoverMessage().fire({
              icon: 'error',
              text: 'Registration failed'
            });
            return of(AuthActions.registerFailure({ error }));
          })
        )
      )
    )
  );

}
