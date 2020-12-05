import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,
  NavParams, } from '@ionic/angular';
import { Product } from '../states/models/product.model';
import {  ProductService } from '../states/services/product.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  providers: [NavParams]
})
export class ItemsPage implements OnInit {
  public products: Array<any> = [];
  noOfItems: any;
  productId;
  productName;
  cart:Array<any> =[];
  constructor(public router: Router,
    public navCtrl: NavController,
    public navParams: NavParams,
    private prodservice :ProductService
    ) {
     
    }
  
  ngOnInit() {
    this.fetchProducts();
    let bookingRes = this.prodservice.getAllProducts();
    bookingRes.subscribe(res => {
      this.products = [];
      res.forEach(item => {
        let a = item;
        a['$key'] = item.key;
        this.products.push(a as Product);
      })
    })
    
  }
  fetchProducts()
  {
    this.prodservice.getAllProducts().subscribe(
      res=>{
        console.log('fetched products');
      }
    )
  }
  async details(id,name)
  {
    console.log(id);
    sessionStorage.setItem("productId",id);
    sessionStorage.setItem("productName",name);
    this.router.navigate(['/productdetails',{id:id}]);
  }
  viewCart(){
    this.router.navigate(['/cart']);
  }
  profiledet()
  {
    this.router.navigate(['/profile']);
  }
  orderdet()
  {
    this.router.navigate(['/order']);
  }
}
