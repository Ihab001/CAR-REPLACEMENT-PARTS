import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Observable } from 'rxjs/Observable';
import { Product } from './../models/products';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';

import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
cart$:Observable<ShoppingCart>;
  appUser:AppUser;
  constructor(private authf :AuthService,private cartService:ShoppingCartService) { 
    this.authf.appUser$.subscribe(appUser=>this.appUser=appUser)
    
  }
  

  async ngOnInit()
  {
    
   
   this.cart$ = await this.cartService.getCart();


  }
  
  logout()
  {
  this.authf.logout();
  }


}
