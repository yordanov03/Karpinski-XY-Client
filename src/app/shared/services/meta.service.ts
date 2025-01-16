import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private meta: Meta, private title: Title) {}

  updateMetaTags(data: any): void {
    const defaultTitle = 'Pawel Kaprinski - Art Portfolio';
    const defaultDescription = 'Explore the unique paintings and exhibitions of Pawel Kaprinski, a contemporary Polish artist.';
    const defaultImage = 'https://example.com/assets/1.jpg'; 
    const defaultUrl = 'https://pawelkaprinski.com';
  
    this.title.setTitle(data.title || defaultTitle);
    this.meta.updateTag({ name: 'description', content: data.description || defaultDescription });
    this.meta.updateTag({ name: 'keywords', content: data.keywords || '' });
    this.meta.updateTag({ property: 'og:image', content: data.ogImage || defaultImage });
    this.meta.updateTag({ property: 'og:url', content: data.ogUrl || defaultUrl });
  }
}
