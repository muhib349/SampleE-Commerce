import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Cart } from 'src/app/interfaces/cart';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) { }

  addOrder(carts: Cart[], user: User) {
    var data = { 'carts': carts, 'user': user }

    return this.http.post('http://localhost:8080/api/add_order', data).subscribe((data) => {
      console.log(data);
    });

  }
}