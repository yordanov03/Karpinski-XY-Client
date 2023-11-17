import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exhibition } from 'src/app/api/models';
import * as ExhibitionActions from '../../../stores/exhibition/exhibition.actions'
import * as fromExhibition from '../../../stores/exhibition/exhibition.selectors'

@Component({
  selector: 'app-exhibition-details',
  templateUrl: './exhibition-details.component.html',
  styleUrls: ['./exhibition-details.component.scss']
})
export class ExhibitionDetailsComponent implements OnInit {

  exhibition$: Observable<Exhibition>;
  currentUrl: string;
  selectedImage: string;

  constructor(private store: Store,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(ExhibitionActions.getExhibition({ id: id }));
        this.exhibition$ = this.store.select(fromExhibition.selectExhibition);
      }
    });
    this.exhibition$.subscribe(exhibition => {
      if (exhibition && exhibition.exhibitionImages.length > 0) {
        this.selectedImage = exhibition.exhibitionImages[0].imageUrl;
      }
    });
  }
  
  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
}
