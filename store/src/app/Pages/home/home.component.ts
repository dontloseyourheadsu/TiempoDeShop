import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { StoreService } from 'src/app/Services/store.service';

const ROWS_HEIGHT:{[id:number]: number} = {
  1: 400,
  3: 335,
  4: 350
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
  
export class HomeComponent implements OnInit, OnDestroy {
  category: string | undefined;
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    const sortMode = this.sort === 'Descending' ? 'desc' : 'asc';
    this.productSubscription =
      this.storeService.getAllProducts(this.count, sortMode, this.category)
      .subscribe((products: Array<Product>) => {
      this.products = products;
    });
  }

  onColumnsCountChange(columns: number): void {
    this.columns = columns;
    this.getProducts();
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts();
  }
}