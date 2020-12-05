import { Product } from './product.model';
export class Order{
    public id: number;
    public product: Product;
    public totalValue: number;
    public Address: string;
    
    public Orderdate:Date;
    public status: string;
   
    public constructor(model) {
        this.id = model.id;
        this.product = model.product;
        this.totalValue = model.totalValue;
        
        this.Address = model.Address;
        this.Orderdate = model.Orderdate;
        this.status = model.status;
    
    }

}