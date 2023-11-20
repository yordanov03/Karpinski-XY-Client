/* tslint:disable */
/* eslint-disable */
import { PaintingImage } from './painting-image';
export interface Painting {
  description?: null | string;
  dimensions?: null | string;
  id?: string;
  isAvailableToSell?: boolean;
  isDeleted?: boolean;
  isOnFocus?: boolean;
  name?: null | string;
  paintingImages?: null | Array<PaintingImage>;
  price?: number;
  technique?: null | string;
  year?: number;
}
