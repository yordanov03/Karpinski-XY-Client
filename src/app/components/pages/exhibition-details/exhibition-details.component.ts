import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exhibition } from 'src/app/api/models';
import * as ExhibitionActions from '../../../stores/exhibitions/exhibitions.actions'
import * as fromExhibition from '../../../stores/exhibitions/exhibitions.selectors'
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-exhibition-details',
  templateUrl: './exhibition-details.component.html',
  styleUrls: ['./exhibition-details.component.scss']
})
export class ExhibitionDetailsComponent implements OnInit {

  exhibition$: Observable<Exhibition>;
  currentUrl: string;
  selectedImage: string;
  apiUrl: string = environment.apiUrl;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

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
        this.selectedImage = exhibition.exhibitionImages[0].imagePath;
      }
    });
  }
  
  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  getFormattedDescription(description: string): SafeHtml {
    // Replace newlines with <br> tags and sanitize the HTML content
    const formattedDescription = description
    .replace(/\n/g, '<br>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">Link</a>');

  return this.sanitizer.bypassSecurityTrustHtml(formattedDescription);
  }
}
