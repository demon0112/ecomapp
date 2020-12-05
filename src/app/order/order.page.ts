import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/states/services/order.service';
import { Order } from '../states/models/order.model';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  
  constructor(private orderService:OrderService,
    public alertController: AlertController,) {
 
   }
  public cart: Array<any> = [];
  address:string;
  public order:Order;
  orderId:number;
  statusO:string;
  totalAmount:number=0;
  orderDate:Date;
  orderstat:string;
  ngOnInit() {
    console.log('in order');
    let bookingRes = this.orderService.getOrder();
    this.cart=[];
    this.cart=bookingRes;
    this.orderstat="Complete your order";
    if(this.cart.length==0){
      this.orderId= null;
      this.statusO=" ";
      this.totalAmount=0;
      this.orderDate=null;
      
    }
    else{
      this.cart.forEach((v) => {
        this.totalAmount += v.price;
      });
      this.orderId= Math.floor(Math.random() * 10);
      this.statusO="Pending";
    }
   
  
  
    console.log('your orders');
  }
completeorder(){
  if(this.address==null)
  {
    this.showAlert("Whoops","Enter address for delivery");
  }
  else{
  this.cart.forEach((v) => {
    this.totalAmount += v.price;
  });
  this.orderDate=new Date();
 this.statusO="Completed";
 this.orderstat="Order Placed";
}
}
async showAlert(title: string, content: string) {
  const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ['OK']
  })

  await alert.present()
}
}
