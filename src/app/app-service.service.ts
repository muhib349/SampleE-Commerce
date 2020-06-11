import { Injectable } from '@angular/core';
import {HttpClient , HttpErrorResponse } from '@angular/common/http'
import { from } from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) {
    //this.headers.append("Content-Type", "application/json");
   }
   handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getUser(){
    return this.http.get('http://localhost:8080/api/get_user').pipe(catchError(this.handleError));;
  }
}
