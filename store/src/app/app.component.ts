import { Component, OnInit } from '@angular/core';
import { Cart } from './Models/cart.model';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet>
    </router-outlet>
  `,
  styles: []
})

export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {
    this.cartService.cart.subscribe((cart: Cart) => {
    });
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart: Cart) => {
      this.cart = cart;
    }
    );
  }
}
