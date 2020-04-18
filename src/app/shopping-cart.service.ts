import { Product } from './models/products';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { promise } from 'protractor';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }
  private create(){
    return this.db.list('/shopping-cart').push({
dataCreated:new Date().getTime()
    });

  }
  async clearCart()
  {
    let cartId= await this.getOrCreatCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }
 async getCart () : Promise<Observable<ShoppingCart>>
  {
    let cartId=await this.getOrCreatCartId();
    return this.db.object('/shopping-cart/' + cartId).map(x=> new ShoppingCart(x.items));
  }
getItem(cartId:string,productId:string)
{
 return this.db.object('/shopping-cart/'+ cartId +'/items/' + productId);

}
 private async getOrCreatCartId():Promise<string>
 {
  let cartId= localStorage.getItem('cartId');
  if(cartId) return cartId;

    let result= await this.create()
    localStorage.setItem('cartId',result.key);
      return result.key;
  
 }
 async addToCart(product:Product)
 {
this.updateItem(product,1);
 }
 async removeFromCart(product:Product)
 {
  this.updateItem(product,-1);
 }
 private async updateItem(product:Product,change:number)
 {
  let cartId= await this.getOrCreatCartId();
  let items$=this.getItem(cartId,product.$key);
  items$.take(1).subscribe(item=>{
   let quantity=(item.quantity|| 0) +change;
   if(quantity === 0) items$.remove();
   else items$.update({
     title:product.title,
     imageurl:product.imageurl,
     price:product.price,
     quantity:quantity});
  });
 }
}
