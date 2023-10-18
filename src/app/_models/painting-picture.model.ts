export class PaintingPicture {
    id?: string; // Question mark indicates it's optional
    imageUrl: string;
    isMainPicture: boolean;
    paintingId?: string; // Foreign key, also optional
  
    constructor(init?: Partial<PaintingPicture>) {
      Object.assign(this, init);
    }
  }
  