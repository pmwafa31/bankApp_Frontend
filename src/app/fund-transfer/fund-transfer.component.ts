import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent {

  errorMsg:string = ""
  //transfer group
  transferForm = this.fb.group({
    //array
    acno:['', [Validators.required, Validators.pattern('[0-9]*')]],
    amt:['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb:FormBuilder){}

  //transfer
  transfer(){
    if(this.transferForm.valid){

    }
    else{
      alert('Invalid details')

    }
  }
}
