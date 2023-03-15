import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //appending token to http header
  appendToken(){
  //fetch token to http header
  const token = localStorage.getItem('token')||''
  //create http header
  var headers = new HttpHeaders()
  if(token){
      headers = headers.append('access-token',token)
      options.headers=headers
  }
  return options
  }
  //register
  registerUser(uname:any,acno:any,pswd:any){
    const body={
      uname,
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/register', body)
  }

  //login
  loginUser(acno:any,pswd:any){ 
    const body={
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login', body)
  }

  //to get balance
  accountBalance(acno:any){
    return this.http.get('http://localhost:3000/balance_enquiry/'+acno,this.appendToken())
  }

  //deposit
  depositAmount(acno:any, amt:any){
    const body ={
      acno,
      amt
    }
    return this.http.post('http://localhost:3000/deposit', body,this.appendToken())
  }

    //fund transfer
    fundTransfer(toAcno:any, pswd:any, amt:any){
      const body ={
        toAcno,
        pswd,
        amt
      }
      return this.http.post('http://localhost:3000/fund_transfer', body,this.appendToken())
    }

    //to get transactions
  getAllTransactions(){
    return this.http.get('http://localhost:3000/transactions',this.appendToken())
  }

  //to delete account
  deleteAccountApi(acno:any){
    return this.http.delete('http://localhost:3000/delete_account/'+acno,this.appendToken())

  }
}
