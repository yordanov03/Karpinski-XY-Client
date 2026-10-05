import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/api/models';
import * as PaintingActions from '../../../stores/paintings/paintings.actions'
import * as fromPainting from '../../../stores/paintings/paintings.selectos'
import * as fromAuth from '../../../stores/auth/auth.selectors'
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {

  portfolioPaintings$: Observable<Painting[]>;
  isLoggedIn$: Observable<boolean>;
  apiUrl: string = environment.apiUrl;
  @ViewChild('masonryGrid', { static: true }) masonryGrid: ElementRef;

  constructor(private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    this.store.dispatch(PaintingActions.loadPortfolioPaintings());
    this.portfolioPaintings$ = this.store.select(fromPainting.selectPortfolioPaintings)
    this.isLoggedIn$ = this.store.select(fromAuth.selectIsLoggedIn)
    
    if (isPlatformBrowser(this.platformId)) {
      import('masonry-layout').then(({ default: Masonry }) => {
        new Masonry(this.masonryGrid?.nativeElement, {});
      });
    }
  }

  onDeleteClick(event: Event, id) {
    event.stopPropagation()
    Swal.fire({
      title: 'Confirmation required',
      text: 'Are you sure you want to delete this entry',
      icon: 'question',
      confirmButtonText: 'yes',
      confirmButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'no',
      focusCancel: true,

    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
       this.store.dispatch(PaintingActions.deletePainting({id: id}))
      }

    })
  }
  
  onEditPainting(event: Event, id) {
    event.stopPropagation()
    this.router.navigate(['paintings/' + id + '/edit'])
  }

  onMakeinquiryClick(name) {
    this.store.dispatch(PaintingActions.makeInquiry({name: name}))
  }
}
