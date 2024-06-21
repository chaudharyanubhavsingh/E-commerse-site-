import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderConfirmationService } from '../order.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderDetails: any = null;
  addressDetails: any = null;
  cartItems: any[] = [];
  
  constructor(
    private router: Router,
    private orderConfirmationService: OrderConfirmationService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const orderId = localStorage.getItem('orderId');
    const userId = localStorage.getItem('userId');

    if (orderId && userId) {
      
      this.orderConfirmationService.getOrderConfirmationDetails(+orderId, +userId).subscribe(
        response => {
        
          this.orderDetails = response.order;
          this.addressDetails = response.address;
          this.cartItems = response.cartItems;
        },
        error => {
          console.error('Error fetching order confirmation details:', error);
        }
      );
    }
  }
  continueShopping(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Delete the user's cart history
      this.cartService.deleteCartHistory(+userId).subscribe(
        () => {
        
          // Clear local storage except for userId
          localStorage.removeItem('orderId');
          localStorage.removeItem('addressId');
          // Navigate to the main shopping page
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error deleting cart history:', error);
        }
      );
    } else {
      // Clear local storage except for userId
      localStorage.removeItem('orderId');
      localStorage.removeItem('addressId');
      // Navigate to the main shopping page
      this.router.navigate(['/dashboard']);
    }
  }
}
