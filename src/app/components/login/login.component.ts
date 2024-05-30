import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private service : JwtService,
    private fb : FormBuilder,
    private router:Router
  ) { 
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submitForm(){
    

    this.service.login(this.loginForm.value).subscribe(response =>{
      console.log("response---- ",response)
      const jwtToken = response;
      localStorage.setItem('jwt',jwtToken);
      this.router.navigateByUrl("/dashboard");

    });
    
  }

}
