import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('accountPanel', { static: false }) accountPanel!: ElementRef<HTMLDivElement>;
  @ViewChild('cartPanel', { static: false }) cartPanel!: ElementRef<HTMLDivElement>;

  cartItems: any[] = [];
  hideContent: boolean = false;
  username = localStorage.getItem('username');
  userId: number | null = null;

  constructor(private router: Router, private renderer: Renderer2, private cartService: CartService) { }
  
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideContent = this.router.url === '/signup';
      }
    });

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = +userId;  // Convert userId to a number
      this.cartService.loadCartHistory(this.userId).subscribe(); // Initial load of cart history
      this.cartService.cartItems$.subscribe(cartItems => {
        this.cartItems = cartItems;
      });
    }

    // Close panels when clicking outside them
    this.addOutsideClickListener(this.accountPanel.nativeElement);
    this.addOutsideClickListener(this.cartPanel.nativeElement);
  }

  togglePanel(panel: HTMLDivElement) {
    // Toggle panel visibility
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  }

  closePanel(panel: HTMLDivElement) {
    // Close panel
    panel.style.display = 'none';
  }

  toggleDisplay() {
    const div = document.getElementById('myDiv');
    if (div) {
      div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }
  }

  addOutsideClickListener(panel: HTMLElement) {
    // Use Renderer2 to handle document click events
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      // Check if the click was outside the panel
      if (panel && !panel.contains(event.target as Node)) {
        // Close the panel if it's open
        if (panel.style.display !== 'none') {
          this.closePanel(panel as HTMLDivElement);
        }
      }
    });
  }
}
