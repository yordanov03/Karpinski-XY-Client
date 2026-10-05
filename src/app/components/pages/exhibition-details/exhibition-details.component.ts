import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exhibition } from 'src/app/api/models';
import * as ExhibitionActions from '../../../stores/exhibitions/exhibitions.actions'
import * as fromExhibition from '../../../stores/exhibitions/exhibitions.selectors'
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
    private router: Router,
    private sanitizer: DomSanitizer,
    private metaService: MetaService) { }

    ngOnInit(): void {
      this.currentUrl = `https://pawelkarpinski.com${this.router.url}`;
    
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
              const imagePath = exhibition.exhibitionImages?.[0]?.imagePath;
              const ogImage = imagePath
                ? `${environment.apiUrl.replace(/\/+$/, '')}/${imagePath.replace(/^\/+/, '')}`
                : 'https://pawelkarpinski.com/assets/img/paintings/homePagePaitings/2.jpg';
              const rawDescription = exhibition.longDescription || `View exhibition details for ${exhibition.title || 'this exhibition'} by Pawel Karpinski.`;
              const description = rawDescription.slice(0, 157) + (rawDescription.length > 157 ? '...' : '');

              this.metaService.updateMetaTags({
                title: `${exhibition.title || 'Exhibition'} - Pawel Karpinski`,
                description,
                ogImage,
                ogUrl: this.currentUrl,
              });
            }
          });
        }
      });
    }
    
  
  async selectImage(index: number): Promise<void> {
    const bootstrap = await import('bootstrap');
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
