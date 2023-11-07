
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Painting } from 'src/app/api/models';
import { selectPainting } from 'src/app/stores/paintings/painting.selectos';
import * as PaintingActions from '../../../stores/paintings/painting.actions'
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-paintings-details',
  templateUrl: './paintings-details.component.html',
  styleUrls: ['./paintings-details.component.scss']
})
export class PaintingsDetailsComponent implements OnInit {
painting$: Observable<Painting>;
currentUrl: string;

  constructor(private store: Store,
    private route: ActivatedRoute) {
    this.painting$ = this.store.select(selectPainting);
  }

  ngOnInit(): void {
    this.currentUrl = window.location.href

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(PaintingActions.loadPainting({ id }));
      }
    });
  }
  selectImage(index: number): void {
    const carouselElement = document.querySelector('#carouselExampleIndicators');

    if (carouselElement) {
      let bsCarousel = bootstrap.Carousel.getInstance(carouselElement);
      if (!bsCarousel) {
        bsCarousel = new bootstrap.Carousel(carouselElement);
      }
      bsCarousel.to(index);
    }
  }

  onMakeinquiryClick(name: string) {
    this.store.dispatch(PaintingActions.makeInquiry({name: name}))
  }
}
