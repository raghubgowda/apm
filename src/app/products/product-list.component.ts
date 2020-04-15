import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit{
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  _listFilter: string = '';
  
  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(filterBy: string){
    this._listFilter = filterBy;
    this.filteredProducts = this.products ? this.filterProducts(filterBy) : this.products;
  }

  filteredProducts: IProduct[];

  products: IProduct[] = [];

  constructor(private productService: ProductService){
  }

  toggleImage(): void{
    this.showImage = !this.showImage;
  }

  ngOnInit(): void{
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  filterProducts(filterBy: string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  onRatingClicked(message: string): void{
    this.pageTitle = `Product List: ${message}`;
  }
}