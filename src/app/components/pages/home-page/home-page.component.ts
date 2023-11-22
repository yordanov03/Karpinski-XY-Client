import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PaintingActions from '../../../stores/painting/painting.actions'
import * as fromPainting from '../../../stores/painting/painting.selectos'
import * as ExhibitionActions from '../../../stores/exhibition/exhibition.actions'
import * as fromExhibition from '../../../stores/exhibition/exhibition.selectors'
import { Exhibition, Painting } from 'src/app/api/models';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
homePagePaitingsUrl = environment.homePagePaitings;
paintingsOnFocus$: Observable<Painting[]>;
availablePaintings$: Observable<Painting[]>;
portfolioPaintings$: Observable<Painting[]>;
exhibitions$: Observable<Exhibition[]>;
paintingsChunks: any[][];
apiUrl: string = environment.apiUrl;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PaintingActions.loadPaintingsOnFocus());
    this.store.dispatch(PaintingActions.loadAvailablePaintings());
    this.store.dispatch(PaintingActions.loadPortfolioPaintings());
    this.store.dispatch(ExhibitionActions.loadExhibitions());

    this.paintingsOnFocus$ = this.store.select(fromPainting.selectPaintingsOnFocus);
    this.availablePaintings$ = this.store.select(fromPainting.selectAvailablePaintings);
    this.portfolioPaintings$ = this.store.select(fromPainting.selectPortfolioPaintings);
    this.exhibitions$ = this.store.select(fromExhibition.selectAllExhibitions).pipe(
      map(exhibitions => exhibitions.slice(0, 3)));
  }

  chunkArray(array, size): any[][] {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i += size) {
      chunked_arr.push(array.slice(i, i + size));
    }
    return chunked_arr.filter(chunk => chunk.length === size); // Filter out incomplete chunks
  }

  onMakeinquiryClick(name){
    this.store.dispatch(PaintingActions.makeInquiry({name: name}))
  }
}
