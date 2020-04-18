import { CategoryService } from './../category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

products:Product[]=[];
filteredProducts:Product[]=[];
categories$;
category:string;
@Input('show-actions')showActions=true;
  constructor(route:ActivatedRoute,categoryService:CategoryService,private producService:ProductService,private cartService:ShoppingCartService) { 
producService.getAll().subscribe(products => {
  this.products =products;
  route.queryParamMap.subscribe(params =>{
    this.category = params.get('category')
    this.filteredProducts=(this.category)?
    this.products.filter(p => p.manufacturer === this.category):
    this.products;
  });
});
this.categories$=categoryService.getMan();


  }

  async ngOnInit()
  {
  this.cart$= await this.cartService.getCart();
  }
 
}

