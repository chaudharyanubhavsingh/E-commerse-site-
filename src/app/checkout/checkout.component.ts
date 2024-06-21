import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { CartService } from '../cart.service';
import { OrderHistoryService } from '../order-history.service'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  userId = localStorage.getItem('userId');
  addressId: number | null = null;
  cartItems: any[] = [];
  cartuserId: number | null = null;
  totalCost: number = 0;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private cartService: CartService,
    private orderHistoryService: OrderHistoryService
  ) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      zipCode: ['', Validators.required],
      country: ['IN', Validators.required],
      userId: this.userId
    });
  }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.cartuserId = +storedUserId;  // Convert userId to a number
      this.cartService.loadCartHistory(this.cartuserId).subscribe(cartItems => {
        this.cartItems = cartItems;
        this.calculateTotalCost();  // Calculate the total cost
      });
    }
  }

  calculateTotalCost(): void {
    this.totalCost = this.cartItems.reduce((sum, item) => {
      const price = +item.price.replace('₹', '');
      return sum + price * item.orderQuantity;
    }, 0);
   
  }
  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const addressData = this.checkoutForm.value;

      // Save address first
      this.addressService.createAddress(addressData).subscribe(
        response => {
         
          this.addressId = response.addressId;  // Capture the addressId from the response

          // Prepare order history data
          const orderHistoryData = {
            // You need to generate or retrieve this value from the response of saving address
            orderName: this.cartItems.map(item => item.orderName).join(', '), // Example of joining all order names
            orderPrice: this.totalCost,
            orderQuantity: this.cartItems.reduce((sum, item) => sum + item.orderQuantity, 0), // Total quantity
            orderDate: new Date().toISOString(), // Example of order date
            addressId: this.addressId,
            userId: this.userId
          };

          // Save order history
          this.orderHistoryService.saveOrderHistory(orderHistoryData).subscribe(
            response => {
              localStorage.setItem('orderId', response.orderId);
              
              this.router.navigate(['/order-confirmation']);
            },
            error => {
              console.error('Error saving order history:', error);
            }
          );
        },
        error => {
          console.error('Error saving address:', error);
        }
      );
    }
  }
}