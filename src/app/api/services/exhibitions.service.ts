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

import { Exhibition } from '../models/exhibition';

@Injectable({
  providedIn: 'root',
})
export class ExhibitionsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllExhibitions
   */
  static readonly GetAllExhibitionsPath = '/Exhibitions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllExhibitions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllExhibitions$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Exhibition>>> {

    const rb = new RequestBuilder(this.rootUrl, ExhibitionsService.GetAllExhibitionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Exhibition>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllExhibitions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllExhibitions(params?: {
    context?: HttpContext
  }
): Observable<Array<Exhibition>> {

    return this.getAllExhibitions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Exhibition>>) => r.body as Array<Exhibition>)
    );
  }

  /**
   * Path part for operation updateExhibition
   */
  static readonly UpdateExhibitionPath = '/Exhibitions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateExhibition()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateExhibition$Response(params?: {
    context?: HttpContext
    body?: Exhibition
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExhibitionsService.UpdateExhibitionPath, 'put');
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
   * To access the full response (for headers, for example), `updateExhibition$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateExhibition(params?: {
    context?: HttpContext
    body?: Exhibition
  }
): Observable<void> {

    return this.updateExhibition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createExhibition
   */
  static readonly CreateExhibitionPath = '/Exhibitions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createExhibition()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createExhibition$Response(params?: {
    context?: HttpContext
    body?: Exhibition
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ExhibitionsService.CreateExhibitionPath, 'post');
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
   * To access the full response (for headers, for example), `createExhibition$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createExhibition(params?: {
    context?: HttpContext
    body?: Exhibition
  }
): Observable<void> {

    return this.createExhibition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getExhibition
   */
  static readonly GetExhibitionPath = '/Exhibitions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExhibition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExhibition$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Exhibition>> {

    const rb = new RequestBuilder(this.rootUrl, ExhibitionsService.GetExhibitionPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Exhibition>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getExhibition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExhibition(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Exhibition> {

    return this.getExhibition$Response(params).pipe(
      map((r: StrictHttpResponse<Exhibition>) => r.body as Exhibition)
    );
  }

  /**
   * Path part for operation deleteExhibition
   */
  static readonly DeleteExhibitionPath = '/Exhibitions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteExhibition()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExhibition$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ExhibitionsService.DeleteExhibitionPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteExhibition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExhibition(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteExhibition$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getExhibitionToEdit
   */
  static readonly GetExhibitionToEditPath = '/Exhibitions/toEdit/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExhibitionToEdit()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExhibitionToEdit$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Exhibition>> {

    const rb = new RequestBuilder(this.rootUrl, ExhibitionsService.GetExhibitionToEditPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Exhibition>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getExhibitionToEdit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExhibitionToEdit(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Exhibition> {

    return this.getExhibitionToEdit$Response(params).pipe(
      map((r: StrictHttpResponse<Exhibition>) => r.body as Exhibition)
    );
  }

}
