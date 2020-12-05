import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public cart = [];
  product;
  constructor(private http:HttpClient) { }
  getOrder() {
    
    return this.cart;
  }


  addProduct(ca) {
    console.log('in service part');
    if (ca.length > 0) {
      ca.forEach((v) => {
        this.cart.push(v);
      });
    }
      console.log(this.cart[0]);
    }
  }

  
