import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exhibition } from 'src/app/api/models';
import * as ExhibitionActions from '../../../stores/exhibitions/exhibitions.actions'
import * as fromExhibition from '../../../stores/exhibitions/exhibitions.selectors'
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';
import { MetaService } from 'src/app/shared/services/meta.service';

@Component({
  selector: 'app-exhibition-details',
  templateUrl: './exhibition-details.component.html',
  styleUrls: ['./exhibition-details.component.scss']
})
export class ExhibitionDetailsComponent implements OnInit {

  exhibition$: Observable<Exhibition>;
  exhibition: Exhibition;
  currentUrl: string;
  selectedImage: string;
  showFullSizeImage: boolean = false;
  fullSizeImageUrl: string;
  apiUrl: string = environment.apiUrl;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private metaService: MetaService) { }

    ngOnInit(): void {
      this.currentUrl = window.location.href;
    
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          // Dispatch action to load the exhibition
          this.store.dispatch(ExhibitionActions.getExhibition({ id }));
          this.exhibition$ = this.store.select(fromExhibition.selectExhibition);
    
          // Subscribe to the exhibition observable
          this.exhibition$.subscribe(exhibition => {
            if (exhibition) {
              this.exhibition = exhibition;
    
              // Dynamic metadata updates
              const ogImage = exhibition.exhibitionImages?.[0]?.imagePath
                ? `${environment.apiUrl}/${exhibition.exhibitionImages[0].imagePath}`
                : `${environment.apiUrl}/assets/img/default-exhibition.jpg`;
    
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
    const paintingImages = this.exhibition?.exhibitionImages || [];
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

  getFormattedDescription(description: string): SafeHtml {
    // Replace newlines with <br> tags and sanitize the HTML content
    const formattedDescription = description
    .replace(/\n/g, '<br>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">Link</a>');

  return this.sanitizer.bypassSecurityTrustHtml(formattedDescription);
  }
}
