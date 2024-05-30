import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private service:JwtService
  ) { }

  ngOnInit(): void {
    this.hello();
  }

  // hello(){
  //   console.log("@@@@@@@@@@@@@@@@@@@@")
  //   this.service.hello().subscribe(response =>{
  //     console.log("response---- ",response)

  //   });
  // }





hello() {
  console.log("@@@@@@@@@@@@@@@@@@@@");
  
  this.service.hello().subscribe(
      response => {
          console.log("response---- ", response);
      },
      error => {
          console.error('Error occurred:', error);
      }
  );
}

}
