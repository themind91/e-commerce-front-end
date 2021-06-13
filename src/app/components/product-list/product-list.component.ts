import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  previousCategoryId!: number;
  currentCategoryId!: number;
  currentCategoryName!: string;
  searchMode: boolean = false;
  products: Product[] = [];
  theKeyword!: string;

  // properties for pagination

  pageNumber!:number;
  pageSize:number = 10;
  totalElements!:number;
 
  previousKeyWord!: string;
  constructor(private productListService: ProductService, private route: ActivatedRoute,private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();  
    }

     
  }
  handleSearchProducts() {

    this.theKeyword = this.route.snapshot.paramMap.get("keyword")!;

    // if we have a different keyword than previous
    // then set pageNUmber to 1

    if(this.previousKeyWord != this.theKeyword){
      this.pageNumber = 1;
    }

    this.previousKeyWord = this.theKeyword;

    this.productListService.searchProductsPaginate(this.pageNumber -1,
                                              this.pageSize, this.theKeyword)
                                              .subscribe(this.processResult());

  }

  handleListProducts(){
    // check if id param is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      // get the id convert to number using +
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;

      this.currentCategoryName = this.route.snapshot.paramMap.get("name")!;

      console.log(this.currentCategoryName);
    }else{
      this.currentCategoryId = 1;

      this.currentCategoryName = "Books";
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productListService.getProductListPaginate(
      this.pageNumber -1, 
      this.pageSize,
      this.currentCategoryId).subscribe(this.processResult());
    
      console.log(this.totalElements);
  }
  processResult() {
   return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; })=>{
     this.products = data._embedded.products;
     this.pageNumber = data.page.number + 1;
     this.pageSize = data.page.size;
     this.totalElements = data.page.totalElements;
   }
  }

  updatePageSize(pageSize:string){

    this.pageSize = +pageSize!;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product){

    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }

}
