import { Component, OnInit } from '@angular/core';
import { Cart } from './Models/cart.model';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="display-phone-none">
      <app-header [cart]="cart"></app-header>
      <router-outlet>
      </router-outlet>
    </div>
    <div class="display-phone-yes">
      <h1>This app is too powerful for phone yet. Visit later.</h1>
    </div>
  `,
  styles: [
    `.display-phone-none {
      display: none;
    }

    .display-phone-yes {
      display: block;
    }

    @media only screen and (min-width: 768px) {
      .display-phone-none {
        display: block;
      }
      .display-phone-yes {
        display: none;
      }
    }
    `
  ]
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
