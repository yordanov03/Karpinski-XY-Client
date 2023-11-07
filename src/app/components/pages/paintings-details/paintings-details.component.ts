import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { Painting } from 'src/app/api/models';
import { selectPainting } from 'src/app/stores/paintings/painting.selectos';
import { environment } from 'src/environments/environment';
import * as PaintingActions from '../../../stores/paintings/painting.actions'

@Component({
  selector: 'app-paintings-details',
  templateUrl: './paintings-details.component.html',
  styleUrls: ['./paintings-details.component.scss']
})
export class PaintingsDetailsComponent implements OnInit {
// id: string
// painting: Painting
// apiRoute = environment.apiUrl
painting$: Observable<Painting>;

  constructor(private store: Store,
    private route: ActivatedRoute) {
    this.painting$ = this.store.select(selectPainting);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(PaintingActions.loadPainting({ id }));
      }
    });
  }

}
