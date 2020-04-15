import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessgae: string = '';

  _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(filterBy: string) {
    this._listFilter = filterBy;
    this.filteredProducts = this.products ? this.filterProducts(filterBy) : this.products;
  }

  filteredProducts: IProduct[];

  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessgae = err
    });
  }

  filterProducts(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List: ${message}`;
  }
}