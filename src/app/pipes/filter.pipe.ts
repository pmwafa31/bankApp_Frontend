import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(transactionArray:[], searchKey:string, propName:string): any [] {
    const result:any = []
    if(!transactionArray || searchKey=='' || propName==''){
      return transactionArray
    }
    transactionArray.forEach((item:any)=>{
      if(item[propName].trim().toLowerCase().includes(searchKey.toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
