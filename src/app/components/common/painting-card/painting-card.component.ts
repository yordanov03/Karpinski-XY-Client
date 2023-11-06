import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as paintingActions from '../../../stores/paintings/painting.actions'
import * as fromPainting from '../../../stores/paintings/painting.selectos'
import * as fromAuth from '../../../stores/auth/auth.selectors'
import { Router } from '@angular/router';
import { Painting } from 'src/app/api/models';
import { PaintingsService } from 'src/app/_services/paintings.service';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  availablePaintings$: Observable<Painting[]>;

  constructor(private store: Store,
    private router: Router,
    private paintingsService: PaintingsService) { }


  ngOnInit(): void {
    this.store.dispatch(paintingActions.loadAvailablePaintings());
    this.availablePaintings$ = this.store.select(fromPainting.selectAvailablePaintings)
    this.isLoggedIn$ = this.store.select(fromAuth.selectIsLoggedIn)
  }

  onDeleteClick(id) {
    console.log(id)
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
       this.store.dispatch(paintingActions.deletePainting({id: id}))
      }

    })
  }

  onEditPainting(id) {
    this.router.navigate(['paintings/' + id + '/edit'])
  }

  onMakeinquiryClick(name) {

  }

}
