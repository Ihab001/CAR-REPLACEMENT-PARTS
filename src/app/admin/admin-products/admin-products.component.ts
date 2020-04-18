import { DataTableModule, DataTableResource } from 'angular5-data-table';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/products';




@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit,OnDestroy {
products:Product[];
filteredproducts:any[];
subscrip:Subscription;
tableResource:DataTableResource<Product>;
items:Product[]=[];
itemCount:number;

  constructor(private prductservice:ProductService ,private rout:Router ,private db:AngularFireDatabase) { 
this.subscrip= this.prductservice.getAll().subscribe(products=>
  {
  this.filteredproducts= this.products=products
  this.initialTable(products);
});
  }
  
  private initialTable(products:Product[])
  {
    this.tableResource=new DataTableResource(products);
    this.tableResource.query({offset:0})
    .then(items=>this.items=items);
    this.tableResource.count()
    .then(count=>this.itemCount=count)
  }

  reloadItems(params)
  {
    console.log(params);
    if(!this.tableResource)return;
    this.tableResource.query(params)
    .then(items=>this.items=items);
  }
delete(p)
{
if(confirm('Are you sure you want to delete this product ?'))
{
return this.db.object('/products/'+ p).remove();
}
}
filter(query:string)
{

this.filteredproducts=(query)?
this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
this.products;
this.initialTable(this.filteredproducts);


}
ngOnDestroy()
{
  this.subscrip.unsubscribe();
}
  ngOnInit() {
  }

}
