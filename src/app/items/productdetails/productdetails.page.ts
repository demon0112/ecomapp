import { Component, OnInit } from '@angular/core';
//ort { StorageService } from 'src/app/states/services/storage.service';
import { ProductService } from 'src/app/states/services/product.service';
import { CartService } from 'src/app/states/services/cart.service';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { Product } from 'src/app/states/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/states/models/card.model';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  productDetail;
  productId;
  setSize: string;
  addtocrt:string;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private cartService: CartService,
    public router: Router) {
    this.productId=sessionStorage.getItem("productId");
    console.log(this.productId);
   }

  ngOnInit() {
  
    this.route.params.subscribe(params => {
      this.productId=this.route.snapshot.paramMap.get('id');
      this.productDetail = this.productService.getProductDetails(+this.productId);
    });
   this.addtocrt="Add to Cart";
  }
  scrollToTop() {
    // this.content.scrollToTop(1500);
  }


  addToCart() {
    console.log('in add to cart');
    this.productDetail.subscribe(
      data => this.initCart(data)
    );
    
  
  }
  initCart(item: Product) {
    const cartItem = new Cart(item);
    cartItem.isChecked = true;
    cartItem.quantity = 1;
    cartItem.name = item.name;
    cartItem.id = item.id;
    cartItem.price = item.price;
    cartItem.imgUrl = item.imgUrl[0];
    cartItem.size = this.setSize;
    console.log('hello sejal');
    this.cartService.addProduct(cartItem);
    this.addtocrt="Added to Cart";
    
  }
  buyNow(item) {
      
  }

  goToCart()
  {
    this.router.navigate(['/cart']);
  }


}
