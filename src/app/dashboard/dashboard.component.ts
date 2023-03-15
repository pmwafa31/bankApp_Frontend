import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import party from "party-js"
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  user:string=""
  acc:any
  account:number=0
  balance:number=0
  depositMsg:string=""
  transferMsg:string = ""
  transferErrMsg:string = ""
  acno:any=""
  logoutSpinner:boolean = false
  deleteConfirm:boolean=false
  deleteSpinner:boolean=false
  constructor(private api:ApiService, private fb:FormBuilder, private router:Router){}

  //deposit form 
  depositForm = this.fb.group({
    //array
    amt:['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(50)]]
  })

  //transfer group
  transferForm = this.fb.group({
    //array
    acno:['', [Validators.required, Validators.pattern('[0-9]*')]],
    amt:['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })
  ngOnInit(): void {
    
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')
    }

    if(localStorage.getItem("username")||''){
      this.user = localStorage.getItem("username")||''
    }
    if(localStorage.getItem("accountnum")||''){
      this.acc = localStorage.getItem("accountnum")||''
    }
    
  }

  getBalance(){
    if(localStorage.getItem("accountnum")||''){
      this.account = JSON.parse(localStorage.getItem("accountnum")||'')
      }
      this.api.accountBalance(this.account).subscribe((data:any)=>{
        this.balance=data.balance
      })
  }

  deposit(){
    if(this.depositForm.valid){
      let amount = this.depositForm.value.amt
      this.account = JSON.parse(localStorage.getItem("accountnum")||'')
      
      this.api.depositAmount(this.account,amount).subscribe((data:any)=>{
        this.depositMsg = data.message
        alert(this.depositMsg)
        setTimeout(()=>{
          this.depositForm.reset()
        },1000)
      },
      (data:any)=>{
        this.depositMsg = data.error.message
        alert(this.depositMsg)
        setTimeout(()=>{
          this.depositForm.reset()
        },1000)
      }
      )
    }
    else{
      alert('Enter amount to be deposited')
    }
  }
  //to show confetti
  showconfetti(source:any){
    party.confetti(source)
  }

  //transfer
  transfer(){
    if(this.transferForm.valid){
      let toAcno = this.transferForm.value.acno
      let pswd = this.transferForm.value.pswd
      let amt = this.transferForm.value.amt
      //transfer api call
      this.api.fundTransfer(toAcno, pswd, amt).subscribe((data:any)=>{
        this.transferMsg = data.message
        setTimeout(()=>{
          this.clearFundTransferForm()
        },3000)
      },
      (result:any)=>{
        this.transferErrMsg = result.error.message
        setTimeout(()=>{
          this.clearFundTransferForm()
        },3000)        
      }
      )
    }
    else{
      alert('Invalid details')

    }
  }

  //clear fund transfer form
  clearFundTransferForm(){
        this.transferForm.reset(),
        this.transferMsg =''
        this.transferErrMsg =''

  }

  //log out function
  logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("accountnum")
    this.logoutSpinner = true
    setTimeout(()=>{
      this.router.navigateByUrl('')
    },3000)
  }

  //delete account
  deleteAccount(){
    this.acno = localStorage.getItem('accountnum')
    this.deleteConfirm = true
  }

  onCancelParent(){
    this.acno = ""
    this.deleteConfirm = false
  }

  onDeleteParent(event:any){
    let deleteAcno = JSON.parse(event)
    this.api.deleteAccountApi(deleteAcno).subscribe((result:any)=>{
      this.acno = ""
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("accountnum")
      this.deleteSpinner = true
      setTimeout(()=>{
        this.router.navigateByUrl('')
        this.deleteSpinner = false
      },4000)
    },
    (result:any)=>{
      alert(result.error.message)
    }
    )
  }
}
