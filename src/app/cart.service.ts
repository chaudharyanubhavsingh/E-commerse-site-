import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8000/cart';  // Update this URL as needed
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(userId: number, dressName: string, quantity: number,price:string): Observable<any> {
    return this.loadCartHistory(userId).pipe(
      switchMap(cartItems => {
        const existingItem = cartItems.find(item => item.orderName === dressName && item.orderQuantity === quantity);
        if (existingItem) {
          return new Observable(observer => {
            observer.next({ message: 'Item already in cart', item: existingItem });
            observer.complete();
          });
        } else {
          return this.http.post<any>(`${this.apiUrl}/add`, { userId, dressName, quantity,price }).pipe(
            tap(() => {
              this.loadCartHistory(userId).subscribe(); // Refresh the cart history after adding to cart
            })
          );
        }
      })
    );
  }

  loadCartHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history/${userId}`).pipe(
      tap(cartItems => this.cartItemsSubject.next(cartItems))
    );
  }

  getCartHistory(userId: number): Observable<any[]> {
    return this.cartItems$;
  }
  deleteCartHistory(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/history/${userId}`).pipe(
      tap(() => this.cartItemsSubject.next([])) // Clear the cart items in the subject
    )}
}
