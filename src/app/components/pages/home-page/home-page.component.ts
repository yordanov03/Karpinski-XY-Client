import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PaintingActions from '../../../stores/paintings/painting.actions'
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
paintingsOnFocus$: Observable<Painting[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PaintingActions.loadPaintingsOnFocus());
    this.paintingsOnFocus$ = this.store.pipe(select(fromPainting.selectPaintingsOnFocus));
  }

  getPaintingsOnFocus(){
 
  }
  onMakeinquiryClick(name){
    this.store.dispatch(PaintingActions.makeInquiry({name: name}))
  }
  
}
