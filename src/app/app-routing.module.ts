import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { LoginComponent } from './login/login.component';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //path for login component
  {
    path:'', component:LoginComponent
  },
  //path for register component
  {
    path:'register', component:RegisterComponent
  },
  //path for dashboard component
  {
    path:'dashboard', component:DashboardComponent
  },
  //path for fund transfer component
  {
    path:'fund_transfer', component:FundTransferComponent
  },
   //path for mini_statement component
   {
    path:'mini_statement', component:MiniStatementComponent
  },
  //path for page not found
  {
    path:'**', component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
