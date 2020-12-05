import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 product;

  public cart = [];
  public cartItemCount = new BehaviorSubject(0);

  constructor(private http:HttpClient) {}
  getCart() {
    return this.cart;
  }
  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      console.log('here1');
      if (p.id === product.id) {
        console.log('here2');
        p.price += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      console.log('here3');
      this.cart.push(product);
      console.log(this.cart[0].name);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.getCartItemCount();
  }
clearCart() {
    this.cart.length = 0;
  }
}
