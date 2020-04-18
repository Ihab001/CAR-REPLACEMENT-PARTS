import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { element } from 'protractor';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CategoryService } from './../../category.service';
import 'rxjs/add/operator/take';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
 

})
export class ProductFormComponent implements OnInit {



  Shapes$;
  selectedShape:string = '';
Man$;
selectedMan: string = '';
selectedYear: string = '';
Brands$;
Years$;
 selectedModels$;
 product={};
 pr:Array<any>;
 x:boolean=true;
id;
 
  //event handler for the select element's change event


  constructor(
    public categoryService:CategoryService, 
    private db:AngularFireDatabase,
    private productservice:ProductService,
     private rout:Router,
     private router:ActivatedRoute
  ) {
    this.Man$= categoryService.getMan();
this.id=this.router.snapshot.paramMap.get('id');
if(this.id)
{ this.productservice.getProduct(this.id).take(1).subscribe(p=>this.product=p 

);
this.productservice.getProduct(this.id).take(1).subscribe(p=>this.pr=p);
 
this.x=false;
}
   }
   save(product){
     if(this.id) this.productservice.update(this.id,product);
     else this.productservice.add(product);

this.rout.navigate(['/admin/products']);
   }
   
 
 

   selectChangeHandler (event:any) {
  
    this.selectedMan = event.target.value;
    this.Brands$= this.db.list('/Brands/'+ this.selectedMan);
    console.log(this.selectedMan);
  
    
  }
selectChangeHandler2 (event: any) {
   
  this.selectedYear = event.target.value;
  this.Years$= this.db.list('/Years/'+ this.selectedYear);
  
  this.Shapes$= this.db.list('/Shapes/'+ this.selectedYear);
  console.log(this.selectedYear);
}


 
  ngOnInit() {
  }

}
