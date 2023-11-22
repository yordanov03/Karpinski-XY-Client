import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/api/models';
import Swal from 'sweetalert2';

import * as PaintingActions from '../../../stores/painting/painting.actions'
import * as fromPainting from '../../../stores/painting/painting.selectos'
import * as fromAuth from '../../../stores/auth/auth.selectors'
import { map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  paintingsToSell$: Observable<Painting[]>;

  paginatedPaintings$: Observable<Painting[]>;
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number;
  apiUrl: string = environment.apiUrl;

  constructor(private store: Store,
    private router: Router) {
      this.store.dispatch(PaintingActions.loadPaintingsToSell());
      this.paintingsToSell$ = this.store.select(fromPainting.selectPaintingsToSell).pipe(
        tap(paintings => {
          this.totalPages = Math.ceil(paintings.length / this.pageSize);
        })
      );
     }


  ngOnInit(): void {
    this.paginatedPaintings$ = this.paintingsToSell$.pipe(
      map(paintings => {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return paintings.slice(startIndex, startIndex + this.pageSize);
      })
    );
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

  goToPage(page: number) {
    this.currentPage = page;
    this.ngOnInit();
  }

}


