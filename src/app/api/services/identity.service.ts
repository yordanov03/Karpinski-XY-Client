/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LoginRequestModel } from '../models/login-request-model';
import { LoginResponseModel } from '../models/login-response-model';
import { RegisterRequestModel } from '../models/register-request-model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation regsiter
   */
  static readonly RegsiterPath = '/Identity/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regsiter()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regsiter$Response(params?: {
    context?: HttpContext
    body?: RegisterRequestModel
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IdentityService.RegsiterPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `regsiter$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regsiter(params?: {
    context?: HttpContext
    body?: RegisterRequestModel
  }
): Observable<void> {

    return this.regsiter$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/Identity/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  login$Response(params?: {
    context?: HttpContext
    body?: LoginRequestModel
  }
): Observable<StrictHttpResponse<LoginResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, IdentityService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponseModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  login(params?: {
    context?: HttpContext
    body?: LoginRequestModel
  }
): Observable<LoginResponseModel> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseModel>) => r.body as LoginResponseModel)
    );
  }

}
