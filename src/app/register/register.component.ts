import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMsg:string = ""
  //register group
  registerForm = this.fb.group({
    //array
    uname:['', [Validators.required, Validators.pattern('[a-zA-z]*')]],
    acno:['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){

  }

  register(){
    if(this.registerForm.valid){
      let uname = this.registerForm.value.uname
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd
      this.api.registerUser(uname, acno, pswd)
      .subscribe((data:any) =>{
        //success case
        alert(data.message)  
        //navigate to login page
        setTimeout(()=>{
          this.router.navigateByUrl('')
        },3000)
      },
      //client error
      (result:any)=>{
        this.errorMsg = result.error.message
      }
      )
      }
      
      else{
      alert('Invalid Form')
      }

  }
}
