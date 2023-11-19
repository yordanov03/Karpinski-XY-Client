/* tslint:disable */
/* eslint-disable */
import { ExhibitionImage } from './exhibition-image';
export interface Exhibition {
  endDate?: string;
  exhibitionImages?: null | Array<ExhibitionImage>;
  id?: string;
  link?: null | string;
  location?: null | string;
  longDescription?: null | string;
  organizer?: null | string;
  startDate?: string;
  title?: null | string;
}
