import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  constructor(private http: HttpClient) { }

  getProductList(){
    return this.http.get('http://localhost:8080/api/get_product');
  }
}
