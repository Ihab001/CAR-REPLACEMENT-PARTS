import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  category: string;
Man$;

  constructor(route:ActivatedRoute,categoryservice:CategoryService) {
   
    this.Man$=categoryservice.getMan();
    route.queryParamMap.subscribe(params =>{
      this.category =params.get('category')
    })
   }

  ngOnInit() {
  }

}
