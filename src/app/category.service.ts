import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ProductFormComponent } from './admin/product-form/product-form.component';

@Injectable()
export class CategoryService {

  constructor(private db:AngularFireDatabase ) { }
 
  getMan(){

    return this.db.list('/Manufacturer');
    
  }
 
  getModels(){

    return this.db.list('/Brands');
  }
  getShapes()
  {
return this.db.list('Shapes');

  }

}
