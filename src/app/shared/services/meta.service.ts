import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";

export interface PageMetadata {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
    ogType?: string;
}

@Injectable({
    providedIn: "root",
})
export class MetaService {
    constructor(
        private meta: Meta,
        private title: Title,
        @Inject(DOCUMENT) private document: Document,
    ) {}

    updateMetaTags(data: Partial<PageMetadata>): void {
        const defaultTitle = "Pawel Karpinski - Art Portfolio";
        const defaultDescription =
            "Explore the unique paintings and exhibitions of Pawel Karpinski, a contemporary Polish artist.";
        const defaultImage = "https://pawelkarpinski.com/assets/img/about/PawelStudio.jpg";
        const defaultUrl = "https://pawelkarpinski.com/";
        const title = data.title || defaultTitle;
        const description = data.description || defaultDescription;
        const image = data.ogImage || defaultImage;
        const url = data.ogUrl || defaultUrl;

        this.title.setTitle(title);
        this.meta.updateTag({ name: "description", content: description });
        if (data.keywords) {
            this.meta.updateTag({ name: "keywords", content: data.keywords });
        }
        this.meta.updateTag({ property: "og:title", content: title });
        this.meta.updateTag({ property: "og:description", content: description });
        this.meta.updateTag({ property: "og:image", content: image });
        this.meta.updateTag({ property: "og:url", content: url });
        this.meta.updateTag({ property: "og:type", content: data.ogType || "website" });
        this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" });
        this.meta.updateTag({ name: "twitter:title", content: title });
        this.meta.updateTag({ name: "twitter:description", content: description });
        this.meta.updateTag({ name: "twitter:image", content: image });
        this.meta.updateTag({ property: "og:image:width", content: "1200" });
        this.meta.updateTag({ property: "og:image:height", content: "630" });

        let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = this.document.createElement("link");
            canonical.rel = "canonical";
            this.document.head.appendChild(canonical);
        }
        canonical.href = url;
    }
}
