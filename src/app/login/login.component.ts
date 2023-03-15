import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMsg:string=""
  successMsg:boolean=false
  //login group
  loginForm = this.fb.group({
    //array
    acno:['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){

  }

  login(){
    if(this.loginForm.valid){
    let acno = this.loginForm.value.acno
    let pswd = this.loginForm.value.pswd
    this.api.loginUser(acno, pswd)
      .subscribe((data:any) =>{
        //success case
        //alert(data.message)  
        this.successMsg = true
        //store username in local storage
        localStorage.setItem("username",data.username)
         //store account number in local storage
         localStorage.setItem("accountnum",data.currentAcno)
        //store token
        localStorage.setItem("token",data.token)
         setTimeout(()=>{
          //navigate to login page
          this.router.navigateByUrl('dashboard')
        },2000)
        
      },
      //client error
      (data:any)=>{
        this.errorMsg = data.error.message
        setTimeout(()=>{
          this.loginForm.reset()
          this.errorMsg=""
        },3000)
      }
      )
    }
    else{
      alert('Invalid Form')
    }

  }
}
