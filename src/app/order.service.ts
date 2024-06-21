import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderConfirmationService {

  private baseUrl = 'http://localhost:8000'; // Replace with your backend base URL

  constructor(private http: HttpClient) { }

  getOrderConfirmationDetails(orderId: number, userId: number): Observable<any> {
   
    const url = `${this.baseUrl}/order-confirmation/${orderId}/${userId}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw error;
  }
}
