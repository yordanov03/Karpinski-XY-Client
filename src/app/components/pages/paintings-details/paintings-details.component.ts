
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/api/models';
import { selectPainting } from 'src/app/stores/paintings/paintings.selectos';
import * as PaintingActions from '../../../stores/paintings/paintings.actions'
import * as bootstrap from 'bootstrap';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/shared/services/meta.service';


@Component({
  selector: 'app-paintings-details',
  templateUrl: './paintings-details.component.html',
  styleUrls: ['./paintings-details.component.scss']
})
export class PaintingsDetailsComponent implements OnInit {
painting$: Observable<Painting>;
painting: Painting;
currentUrl: string;
activeTab = 'additionalInfo';

showFullSizeImage: boolean = false;
fullSizeImageUrl: string;
apiUrl: string = environment.apiUrl;

  constructor(private store: Store, private route: ActivatedRoute, private metaService: MetaService) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.currentUrl = window.location.href;
  
    // Subscribe to route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // Dispatch action to load painting
        this.store.dispatch(PaintingActions.loadPainting({ id: id }));
        this.painting$ = this.store.select(selectPainting);
  
        // Subscribe to the painting observable
        this.painting$.subscribe(painting => {
          if (painting) {
            this.painting = painting;
  
            // Metadata Configuration
            const metaConfig = this.route.snapshot.data['metaConfig'] || {};
  
            // Fallback logic for ogImage
            const ogImage = metaConfig.ogImage || (painting.paintingImages?.[0]?.imagePath 
              ? `${environment.apiUrl}/${painting.paintingImages[0].imagePath}` 
              : `${environment.apiUrl}/assets/img/default.jpg`);
  
            // Update metadata
            this.metaService.updateMetaTags({ property: 'og:image', content: ogImage });
            this.metaService.updateMetaTags({ property: 'og:url', content: this.currentUrl });
          }
        });
      }
    });
  }
  
  selectImage(index: number): void {
    const carouselElement = document.querySelector('#carouselIndicators');

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

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  openFullSizeImage(imageUrl: string): void {
    this.fullSizeImageUrl = imageUrl;
    this.showFullSizeImage = true;
    window.addEventListener('keydown', this.handleKeyboardEvent);
  }

  closeFullSizeImage(): void {
    this.showFullSizeImage = false;
    window.removeEventListener('keydown', this.handleKeyboardEvent);
  }

  navigateFullSizeImage(direction: 'prev' | 'next'): void {
    const paintingImages = this.painting?.paintingImages || [];
    if (!paintingImages.length) return;

    const currentIndex = paintingImages.findIndex(img => img.imagePath === this.fullSizeImageUrl);
    let newIndex;
    if (direction === 'prev') {
        newIndex = (currentIndex - 1 + paintingImages.length) % paintingImages.length;
    } else {
        newIndex = (currentIndex + 1) % paintingImages.length;
    }
    this.fullSizeImageUrl = paintingImages[newIndex].imagePath;
}

handleKeyboardEvent = (event: KeyboardEvent): void => {
  if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.navigateFullSizeImage('prev');
  } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.navigateFullSizeImage('next');
  }
};

}
