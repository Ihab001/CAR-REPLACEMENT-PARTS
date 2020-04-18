import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase , private cartService:ShoppingCartService) { }
storeOrder(order)
{
  this.cartService.clearCart();
 return this.db.list('/orders').push(order);
}
getAllOrders()
{
  return this.db.list('/orders');
}
getOrdersByUser(userId:string){

return this.db.list('/orders',{
  query:{
    orderByChild:'userId',
    equalTo:userId
  }
});
}

}
