import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css']
})
export class MiniStatementComponent implements OnInit {
  transactionArray:any
  searchKey:string=''
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllTransactions().subscribe((result:any)=>{
      this.transactionArray = result.transaction
      
      })
  }

  //search
  search(event:any){
    this.searchKey = event.target.value
  }

  //make table data into downloadable pdf
  generatePDF(){
    var pdf = new jspdf()
    let col = ['Type', 'FromAcno', 'ToAcno','Amount']
    let row:any = []

    pdf.setFontSize(16);
    pdf.text('Mini Statement', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    //convert transactionArray into nested array
    var itemArray = this.transactionArray
    for(let element of itemArray){
      var temp = [element.type,element.fromAcno,element.toAcno,element.amount]     
      row.push(temp)
    }
      
    (pdf as any).autoTable(col, row, {startY:10})
     
    // Open PDF document in browser's new tab
     pdf.output('dataurlnewwindow')

     // Download PDF doc  
     pdf.save('ministatement.pdf')
  }
}
