import { Observable, throwError } from 'rxjs';
import { IProduct } from './product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<IProduct[]> {
        const url: string = '/api/products/products.json';
        return this.http.get<IProduct[]>(url).pipe(
            catchError(this.handleError));
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
          .pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
          );
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