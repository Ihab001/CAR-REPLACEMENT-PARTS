import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$;
  constructor(private cartService: ShoppingCartService, private translate: TranslateService) { 
    translate.setDefaultLang('en');
   
  }
  switchLanguage(language: string) {
    this.translate.use(language);
}
  async ngOnInit() {
this.cart$= await this.cartService.getCart();
  }
clearCart()
{
  this.cartService.clearCart();
}
}
