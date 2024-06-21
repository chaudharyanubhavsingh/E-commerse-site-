import { Component , OnInit} from '@angular/core';
import { OrderHistoryService } from '../order-history.service'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  userId = localStorage.getItem('userId');
  orderuserId: number | null = null;
  orderItems: any[] = [];
constructor(private orderHistoryService: OrderHistoryService){
  }
  orders: any[] = [];
  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.orderuserId = +storedUserId;  // Convert userId to a number
      this.orderHistoryService.getOrderHistory(this.orderuserId).subscribe(orderItems => {
      
        this.orderItems = orderItems;
      });
    }
  }
}
 