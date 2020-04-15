import { Observable, throwError } from 'rxjs';
import { IProduct } from './../products/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<IProduct[]> {
        const url: string = '/api/products/products.json';
        return this.http.get<IProduct[]>(url).pipe(
            catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';

        if (err instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            errorMessage = `Server returned code: ${err.status} with message: ${err.message}`
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}