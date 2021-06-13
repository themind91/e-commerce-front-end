import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from "../common/product"
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  private baseUrl = "http://localhost:8080/products";
  private categoryUrl = "http://localhost:8080/product-category";
  
  constructor(private httpClient: HttpClient) { }


  getProductListPaginate(page:number, pageSize: number, categoryId: number): Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                      +`&page=${page}&size=${pageSize}`;


    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(categoryId:number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProduct(theProductId: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map((response: { _embedded: { products: any; }; }) => response._embedded.products)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }  
  
  searchProductsPaginate(page:number, pageSize: number, theKeyWord: string): Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
                      +`&page=${page}&size=${pageSize}`;


    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  getProductCategories() : Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductsCategories>(this.categoryUrl).pipe(
      map((response: { _embedded: { productCategory: any; }; }) => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size: number,
    totalElements:number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductsCategories{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
