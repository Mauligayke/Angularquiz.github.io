import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm! :FormGroup;
    constructor(private formBuilder : FormBuilder,private http : HttpClient,private router: Router){}

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
    Email:['',Validators.required],
    Password:['',Validators.required]

  })

}
Login(){
this.http.get<any>("http://localhost:3000/signupUsers")
.subscribe(res=>{
  const user = res.find((a:any)=>{
    return a.Email=== this.loginForm.value.Email && a.Password=== this.loginForm.value.Password});
    if(user){
      alert("Login Success");
      this.loginForm.reset();
      this.router.navigate(['Welcome'])
    }else{
      alert("User Not Found")
    }
  }, err=>{
    alert("Something went to Wrong")
  })

}


}
