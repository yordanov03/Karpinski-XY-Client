import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/api/models';
import * as PaintingActions from '../../../stores/paintings/painting.actions'
import * as fromPainting from '../../../stores/paintings/painting.selectos'
import * as fromAuth from '../../../stores/auth/auth.selectors'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {

  portfolioPaintings$: Observable<Painting[]>;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store,
    private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(PaintingActions.loadPortfolioPaintings());
    this.portfolioPaintings$ = this.store.select(fromPainting.selectPortfolioPaintings)
    this.isLoggedIn$ = this.store.select(fromAuth.selectIsLoggedIn)
  }

  onDeleteClick(id) {
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
  
  onEditPainting(id) {
    this.router.navigate(['paintings/' + id + '/edit'])
  }

  onMakeinquiryClick(name) {
    this.store.dispatch(PaintingActions.makeInquiry({name: name}))
  }
}