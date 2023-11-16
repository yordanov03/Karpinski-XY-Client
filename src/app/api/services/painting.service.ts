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

import { Painting } from '../models/painting';

@Injectable({
  providedIn: 'root',
})
export class PaintingService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation onFocus
   */
  static readonly OnFocusPath = '/Painting';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `onFocus()` instead.
   *
   * This method doesn't expect any request body.
   */
  onFocus$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Painting>>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.OnFocusPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Painting>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `onFocus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  onFocus(params?: {
    context?: HttpContext
  }
): Observable<Array<Painting>> {

    return this.onFocus$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Painting>>) => r.body as Array<Painting>)
    );
  }

  /**
   * Path part for operation update
   */
  static readonly UpdatePath = '/Painting';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  update$Response(params?: {
    context?: HttpContext
    body?: Painting
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.UpdatePath, 'put');
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
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  update(params?: {
    context?: HttpContext
    body?: Painting
  }
): Observable<void> {

    return this.update$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation create
   */
  static readonly CreatePath = '/Painting';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  create$Response(params?: {
    context?: HttpContext
    body?: Painting
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.CreatePath, 'post');
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
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  create(params?: {
    context?: HttpContext
    body?: Painting
  }
): Observable<void> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPaintingToEdit
   */
  static readonly GetPaintingToEditPath = '/Painting/toEdit/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaintingToEdit()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaintingToEdit$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Painting>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.GetPaintingToEditPath, 'get');
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
        return r as StrictHttpResponse<Painting>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPaintingToEdit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaintingToEdit(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Painting> {

    return this.getPaintingToEdit$Response(params).pipe(
      map((r: StrictHttpResponse<Painting>) => r.body as Painting)
    );
  }

  /**
   * Path part for operation loadPainting
   */
  static readonly LoadPaintingPath = '/Painting/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadPainting()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadPainting$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Painting>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.LoadPaintingPath, 'get');
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
        return r as StrictHttpResponse<Painting>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loadPainting$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadPainting(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Painting> {

    return this.loadPainting$Response(params).pipe(
      map((r: StrictHttpResponse<Painting>) => r.body as Painting)
    );
  }

  /**
   * Path part for operation delete
   */
  static readonly DeletePath = '/Painting/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.DeletePath, 'delete');
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
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.delete$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation portfolio
   */
  static readonly PortfolioPath = '/Painting/portfolio';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `portfolio()` instead.
   *
   * This method doesn't expect any request body.
   */
  portfolio$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Painting>>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.PortfolioPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Painting>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `portfolio$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  portfolio(params?: {
    context?: HttpContext
  }
): Observable<Array<Painting>> {

    return this.portfolio$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Painting>>) => r.body as Array<Painting>)
    );
  }

  /**
   * Path part for operation available
   */
  static readonly AvailablePath = '/Painting/available';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `available()` instead.
   *
   * This method doesn't expect any request body.
   */
  available$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Painting>>> {

    const rb = new RequestBuilder(this.rootUrl, PaintingService.AvailablePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Painting>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `available$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  available(params?: {
    context?: HttpContext
  }
): Observable<Array<Painting>> {

    return this.available$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Painting>>) => r.body as Array<Painting>)
    );
  }

}