import { ActivatedRoute } from '@angular/router';
import { Dressdata } from '../app.module';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.css']
})
export class DressComponent implements OnInit {
  dress: any;
  userId: number | null = null;

  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert id to a number
     // Log the dress id incremented by 1
      this.dress = Dressdata[id - 1];
    });

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = +userId;  // Convert userId to a number
    }
  }

  addToCart(quantity: string): void {
    const quantityNumber = Number(quantity); // Convert quantity to number
    if (this.userId !== null) {
      this.cartService.addToCart(this.userId, this.dress.name, quantityNumber, this.dress.price).subscribe(
        response => {
          if (response.message === 'Item already in cart') {
            console.log(response.message);
          } else {
            console.log('Added to cart:');
          }
        },
        error => {
          console.error('Error adding to cart:', error);
        }
      );
    }
  }
}
