import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../Models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../Models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : { items: [] }
  );

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items: Array<CartItem> = this.cart.value.items;

    const itemsInCart = items.find((cartItem: CartItem) => cartItem.id === item.id);

    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('Item added to cart', 'OK', {
      duration: 3000,
    });

    localStorage.setItem('cart', JSON.stringify(this.cart.value));
  }

  getTotal(items: Array<CartItem>): number {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart cleared', 'OK', {
      duration: 3000,
    });

    localStorage.setItem('cart', JSON.stringify(this.cart.value));
  }

  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter((cartItem: CartItem) => cartItem.id !== item.id);

    this.cart.next({ items: filteredItems });
    this._snackBar.open('Item removed from cart', 'OK', {
      duration: 3000,
    });

    localStorage.setItem('cart', JSON.stringify(this.cart.value));
  }

  removeQuantity(item: CartItem): void {
    const items: Array<CartItem> = this.cart.value.items;

    const itemsInCart = items.find((cartItem: CartItem) => cartItem.id === item.id);

    if (itemsInCart) {
      if (itemsInCart.quantity > 1) {
        itemsInCart.quantity -= 1;
      } else {
        this.removeFromCart(item);
      }
    }

    this.cart.next({ items });
    this._snackBar.open('Item quantity decreased', 'OK', {
      duration: 3000,
    });

    localStorage.setItem('cart', JSON.stringify(this.cart.value));
  }
}
