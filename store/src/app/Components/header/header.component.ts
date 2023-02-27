import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/Models/cart.model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity: number = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  constructor(private cartService: CartService) { }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
