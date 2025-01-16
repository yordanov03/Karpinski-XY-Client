import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from './stores/auth/auth.actions';
import { JwtService } from './shared/services/jwt.service';
import { MetaService } from './shared/services/meta.service';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {
    location: any;
    routerSubscription: any;

    constructor(private router: Router, private store: Store, private jwtService: JwtService, private metaService: MetaService, private route: ActivatedRoute) {
    }

    ngOnInit(){
        this.recallJsFuntions();

        if (this.jwtService.isTokenValid()) {
          const token = this.jwtService.getToken();
          const username = this.jwtService.getUsername();
      
          if (token && username) {
            this.store.dispatch(AuthActions.loginSuccess({ user: { token, username } }));
          }
        } else {
          this.jwtService.clearToken(); // Clear expired token
        }
    }

    recallJsFuntions() {
        this.router.events
        .subscribe((event) => {
            if ( event instanceof NavigationStart ) {
                $('.preloader').fadeIn('slow');
            }
        });
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            $.getScript('../assets/js/custom.js');
            $('.preloader').fadeOut('slow');
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

        this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd), // Listen for navigation events
          map(() => {
            let child = this.route.firstChild;
            while (child?.firstChild) {
              child = child.firstChild;
            }
            return child?.snapshot.data; // Extract meta data from route
          })
        )
        .subscribe((data) => {
          if (data) {
            this.metaService.updateMetaTags(data); // Update meta tags
          }
        });
    }
}