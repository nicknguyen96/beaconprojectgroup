import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');
        const newRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
        return next.handle(newRequest);
    }
}