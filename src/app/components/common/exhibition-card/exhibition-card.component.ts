import { Component, EnvironmentInjector, Input, OnInit } from '@angular/core';
import * as ExhibitionActions from '../../../stores/exhibition/exhibition.actions'
import * as fromExhibition from '../../../stores/exhibition/exhibition.selectors'
import * as fromAuth from '../../../stores/auth/auth.selectors'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Exhibition } from 'src/app/api/models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exhibition-card',
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.scss']
})
export class ExhibitionCardComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  exhibitions$: Observable<Exhibition[]>;
  apiUrl: string = environment.apiUrl;

  @Input() exhibition: Exhibition;

  constructor(private store: Store,
    private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(ExhibitionActions.loadExhibitions());
    this.exhibitions$ = this.store.select(fromExhibition.selectAllExhibitions);

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
        this.store.dispatch(ExhibitionActions.deleteExhibition({ id }));
      }

    })
  }

  onEdit(id) {
    this.router.navigate(['exhibitions/' + id + '/edit'])
  }

}
