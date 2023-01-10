import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardingComponent } from './components/boarding/boarding.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee', children: [
    { path: '', component: EmployeeHomeComponent},
    { path: 'boarding', component: BoardingComponent}
  ]},
  { path: 'hr', children: [
    { path: 'hiringManagement', component: HiringManagementComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
