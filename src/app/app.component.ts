import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { User } from './interfaces/user'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';

  ngUser: User;

  constructor(private service: AppServiceService){}

  ngOnInit(){
    this.service.getUser().subscribe((response: User)=>{
      this.ngUser = response
    },(err)=>{
      console.log('this is: '+ err);
    });
  }

  



}
