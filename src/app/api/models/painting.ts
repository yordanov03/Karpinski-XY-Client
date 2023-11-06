/* tslint:disable */
/* eslint-disable */
import { Image } from './image';
export interface Painting {
  description?: null | string;
  dimensions?: null | string;
  id?: string;
  images?: null | Array<Image>;
  isAvailableToSell?: boolean;
  isDeleted?: boolean;
  isOnFocus?: boolean;
  name?: null | string;
  price?: number;
  shortDescription?: null | string;
  technique?: null | string;
  year?: number;
}
