import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/states/models/card.model';
import { CartService } from 'src/app/states/services/cart.service';
import { OrderService } from 'src/app/states/services/order.service';
import { Product } from 'src/app/states/models/product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cart: Array<any> = [];
  totalAmount:Number=0;
  
  constructor(private cartService:CartService,
    private orderService:OrderService,
    public router: Router) {
    if(localStorage.getItem("carts"))
    {
      this.cart=JSON.parse(localStorage.getItem("carts"))
    }
    setInterval(()=>{
      if(localStorage.getItem("carts"))
      {
        this.cart=JSON.parse(localStorage.getItem("carts"))
      }
   },500);
   }

  ngOnInit() {
    console.log('in cart');
    let bookingRes = this.cartService.getCart();
   this.cart=[];
   this.cart=bookingRes;
    console.log(this.cart[0]);
    if (this.cart.length > 0) {
      this.cart.forEach((v) => {
        this.totalAmount += v.price;
      });
    }
    console.log(this.totalAmount);
  }
  placeorder()  {
    console.log('in add to order');
    this.orderService.addProduct(this.cart);
    this.cartService.clearCart();
    this.totalAmount=0;
    this.router.navigate(['/order']);
  }
 
}
