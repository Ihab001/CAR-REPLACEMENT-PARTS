import { order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit ,OnDestroy{
  shipping={};
 

cart:ShoppingCart=null;
cartSubscription:Subscription;
userSubscription :Subscription;
userId:string;
constructor(
  private router:Router,
  private orderService :OrderService,
  private cartService:ShoppingCartService,
private authService:AuthService
)
{}
async ngOnInit()
{
  let cart$= await this.cartService.getCart();
  this.cartSubscription= cart$.subscribe(cart => this.cart=cart);
 this.userSubscription= this.authService.user$.subscribe(user => this.userId=user.uid );
}
ngOnDestroy()
{
this.cartSubscription.unsubscribe();
this.userSubscription.unsubscribe();
}

async placeOrder()
{
  let Order= new order( this.userId, this.shipping, this.cart);

let result=await this.orderService.storeOrder(Order);
this.router.navigate(['/order-success',result.key])
}



}
