/* tslint:disable */
/* eslint-disable */
import { IdentityError } from './identity-error';
export interface IdentityResult {
  errors?: null | Array<IdentityError>;
  succeeded?: boolean;
}
