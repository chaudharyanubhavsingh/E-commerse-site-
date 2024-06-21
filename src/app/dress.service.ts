import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Dress } from './dress.model';
import { Dressdata } from './app.module';

@Injectable({
  providedIn: 'root',
})
export class DressService {
  private apiUrl = 'http://localhost:8000/dresses';

  constructor(private http: HttpClient) {}

  getDresses(): Observable<Dress[]> {
    return this.http.get<Dress[]>(this.apiUrl).pipe(
      tap((data) => console.log('Fetched dresses:')),
      catchError(this.handleError<Dress[]>('getDresses', Dressdata))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
