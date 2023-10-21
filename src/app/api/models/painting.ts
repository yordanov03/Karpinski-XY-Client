/* tslint:disable */
/* eslint-disable */
import { PaintingPicture } from './painting-picture';
export interface Painting {
  description?: null | string;
  dimensions?: null | string;
  id?: string;
  isAvailableToSell?: boolean;
  isDeleted?: boolean;
  name?: null | string;
  onFocus?: boolean;
  paintingPictures?: null | Array<PaintingPicture>;
  price?: number;
  shortDescription?: null | string;
  technique?: null | string;
  year?: number;
}
