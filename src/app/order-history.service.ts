import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(private http: HttpClient) { }

  saveOrderHistory(orderData: any) {
    return this.http.post<any>('http://localhost:8000/order-history', orderData);
  }

  getOrderHistory( userId: number): Observable<any> {
   
    const url = `${'http://localhost:8000/orders'}/${userId}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw error;
  }
}
