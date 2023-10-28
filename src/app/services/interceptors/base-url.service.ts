import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = 'http://localhost:8000'

    req = req.clone({
      url: baseUrl + req.url,
      withCredentials: true
    });
    return next.handle(req);
  }

  constructor() { }
}
