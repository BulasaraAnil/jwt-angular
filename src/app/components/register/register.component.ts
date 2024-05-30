import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';

// export interface customer{
//    email:any,
//    name:any,
// 	 password:any,
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  //customer:customer={email:undefined,name:undefined,password:undefined};

  constructor(
    private service:JwtService,
    private fb : FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
    },{validators:this.passwordMatchValidator})
   }

  ngOnInit(): void {
  }


  passwordMatchValidator(formGroup : FormGroup){
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if(password != confirmPassword){
      formGroup.get('confirmPassword')?.setErrors({passwordMismatch:true});
    }else{
      formGroup.get('confirmPassword')?.setErrors(null);
    }

  }

  // submitForm(){
  //   console.log("@@@@@@@@@",this.registerForm?.value);
  //   this.jwtservice.register(this.registerForm?.value).subscribe(response =>{
  //     console.log("##########",response);
  //   })
  // }

  submitForm() {
    // this.customer.email = this.registerForm.get('email')?.value;
    // this.customer.name = this.registerForm.get('name')?.value;
    // this.customer.password = this.registerForm.get('password')?.value;
   // console.log(this.customer);
    this.service.register(this.registerForm?.value).subscribe(
      (response) => {
        if (response.id != null) {
          alert("Hello " + response.name);
        }
      }
    )
  }
  
}
