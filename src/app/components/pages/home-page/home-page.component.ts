import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as paintingActions from '../../../stores/paintings/painting.actions'
import * as fromPainting from '../../../stores/paintings/painting.selectos'
import { Painting } from 'src/app/api/models';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
homePagePaitingsUrl = environment.homePagePaitings;
// paintingsOnFocusPt1: Array<Painting> = [];
// paintingsOnFocusPt2: Array<Painting> = [];
// apiUrl = environment.apiUrl;
paintingsOnFocus$: Observable<Painting[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(paintingActions.loadPaintingsOnFocus());

    // Select paintings on focus from the store
    this.paintingsOnFocus$ = this.store.pipe(select(fromPainting.selectPaintingsOnFocus));
  }

  getPaintingsOnFocus(){
 
  }
  onMakeinquiryClick(data){

  }
  
}
