import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/api/models';
import { selectPainting } from 'src/app/stores/paintings/paintings.selectos';
import * as PaintingActions from '../../../stores/paintings/paintings.actions';
import * as bootstrap from 'bootstrap';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/shared/services/meta.service';

@Component({
  selector: 'app-paintings-details',
  templateUrl: './paintings-details.component.html',
  styleUrls: ['./paintings-details.component.scss']
})
export class PaintingsDetailsComponent implements OnInit, AfterViewInit {
    painting$: Observable<Painting>;
    painting: Painting;
    currentUrl: string;
    activeTab = 'additionalInfo';

    showFullSizeImage: boolean = false;
    fullSizeImageUrl: string;
    apiUrl: string = environment.apiUrl;

    @ViewChild('fullImage', { static: false }) fullImage!: ElementRef<HTMLImageElement>;
    @ViewChild('watermarkCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

    constructor(private store: Store, private route: ActivatedRoute, private metaService: MetaService) {}

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.currentUrl = window.location.href;

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.store.dispatch(PaintingActions.loadPainting({ id: id }));
                this.painting$ = this.store.select(selectPainting);

                this.painting$.subscribe(painting => {
                    if (painting) {
                        this.painting = painting;
                        const metaConfig = this.route.snapshot.data['metaConfig'] || {};
                        const ogImage = metaConfig.ogImage || 
                            (painting.paintingImages?.[0]?.imagePath 
                                ? `${environment.apiUrl}/${painting.paintingImages[0].imagePath}` 
                                : `${environment.apiUrl}/assets/img/default.jpg`);

                        this.metaService.updateMetaTags({ property: 'og:image', content: ogImage });
                        this.metaService.updateMetaTags({ property: 'og:url', content: this.currentUrl });

                        // Apply watermark to all carousel images after they load
                        setTimeout(() => {
                            const images = document.querySelectorAll<HTMLImageElement>('.carousel-item img');
                            images.forEach(img => this.applyWatermark(img));
                        }, 500);
                    }
                });
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const images = document.querySelectorAll<HTMLImageElement>('.carousel-item img');
            images.forEach(img => this.applyWatermark(img));
        }, 500);
    }

    applyWatermark(imageElement: HTMLImageElement): void {
        if (!imageElement) return;
    
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        if (!ctx) return;
    
        const img = new Image();
        img.crossOrigin = "anonymous"; // Prevents CORS issues
        img.src = imageElement.src;
    
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
    
            // Watermark text settings
            const text = "© Karpinski XY";
            const fontSize = img.width / 35; // Adjust dynamically based on image size
            ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            const textWidth = ctx.measureText(text).width;
    
            // Padding and margins
            const paddingX = fontSize * 2;
            const paddingY = fontSize * 1.2;
            const borderRadius = fontSize * 0.5;
    
            // Position calculation
            const boxWidth = textWidth + paddingX * 2;
            const boxHeight = fontSize + paddingY * 2;
            const x = img.width * 0.95 - boxWidth;
            const y = img.height * 0.95 - boxHeight;
    
            // Smooth background gradient effect (20% opacity)
            const gradient = ctx.createLinearGradient(x, y, x + boxWidth, y + boxHeight);
            gradient.addColorStop(0, "rgba(0, 0, 0, 0.2)"); // Black at 20% opacity
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)"); // Even more transparent at bottom
    
            // Draw background rectangle with 20% opacity
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(x + borderRadius, y);
            ctx.lineTo(x + boxWidth - borderRadius, y);
            ctx.quadraticCurveTo(x + boxWidth, y, x + boxWidth, y + borderRadius);
            ctx.lineTo(x + boxWidth, y + boxHeight - borderRadius);
            ctx.quadraticCurveTo(x + boxWidth, y + boxHeight, x + boxWidth - borderRadius, y + boxHeight);
            ctx.lineTo(x + borderRadius, y + boxHeight);
            ctx.quadraticCurveTo(x, y + boxHeight, x, y + boxHeight - borderRadius);
            ctx.lineTo(x, y + borderRadius);
            ctx.quadraticCurveTo(x, y, x + borderRadius, y);
            ctx.closePath();
            ctx.fill();
    
            // Draw text with 20% opacity
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)"; // White at 20% opacity
            ctx.fillText(text, x + boxWidth / 2, y + boxHeight / 2);
    
            // Convert canvas to an image
            imageElement.src = canvas.toDataURL("image/png");
        };
    }    

    selectImage(index: number): void {
        const carouselElement = document.querySelector('#carouselIndicators');

        if (carouselElement) {
            let bsCarousel = bootstrap.Carousel.getInstance(carouselElement);
            if (!bsCarousel) {
                bsCarousel = new bootstrap.Carousel(carouselElement);
            }
            bsCarousel.to(index);

            setTimeout(() => {
                const activeImage = document.querySelector<HTMLImageElement>('.carousel-item.active img');
                if (activeImage) this.applyWatermark(activeImage);
            }, 300);
        }
    }

    navigateFullSizeImage(direction: 'prev' | 'next'): void {
        const paintingImages = this.painting?.paintingImages || [];
        if (!paintingImages.length) return;

        const currentIndex = paintingImages.findIndex(img => img.imagePath === this.fullSizeImageUrl);
        let newIndex = direction === 'prev'
            ? (currentIndex - 1 + paintingImages.length) % paintingImages.length
            : (currentIndex + 1) % paintingImages.length;

        this.fullSizeImageUrl = paintingImages[newIndex].imagePath;

        setTimeout(() => {
            const activeImage = document.querySelector<HTMLImageElement>('.carousel-item.active img');
            if (activeImage) this.applyWatermark(activeImage);
        }, 300);
    }

    openFullSizeImage(imageUrl: string): void {
        this.fullSizeImageUrl = imageUrl;
        this.showFullSizeImage = true;
        setTimeout(() => {
            const fullSizeImage = document.querySelector<HTMLImageElement>('.full-size-image-modal img');
            if (fullSizeImage) this.applyWatermark(fullSizeImage);
        }, 300);
        window.addEventListener('keydown', this.handleKeyboardEvent);
    }

    closeFullSizeImage(): void {
        this.showFullSizeImage = false;
        window.removeEventListener('keydown', this.handleKeyboardEvent);
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

    onMakeinquiryClick(paintingName: string): void {
        console.log(`Inquiry made for painting: ${paintingName}`);
        this.store.dispatch(PaintingActions.makeInquiry({ name: paintingName }));
    }
}
