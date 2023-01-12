import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardingComponent } from './components/boarding/boarding.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OnboardingDetailPageComponent } from './components/onboarding-detail-page/onboarding-detail-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { VisaManagementHrComponent } from './components/visa-management-hr/visa-management-hr.component';
import { HousingManagementComponent } from './components/housing-management/housing-management.component';
import { VisaManagementEmployeeComponent } from './components/visa-management-employee/visa-management-employee.component';
import { HousingManagementEmployeeComponent } from './components/housing-management-employee/housing-management-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'employee', children: [
      { path: '', component: EmployeeHomeComponent },
      { path: 'boarding', component: BoardingComponent },
      { path: 'visa', component: VisaManagementEmployeeComponent},
      { path: 'housing', component: HousingManagementEmployeeComponent}
    ]
  },
  {
    path: 'hr', children: [
      { path: 'hiringManagement', component: HiringManagementComponent },
      { path: 'hiringManagement/:employeeid', component: OnboardingDetailPageComponent },
      { path: 'visaManagement', component: VisaManagementHrComponent},
      { path: 'housingManagement', component: HousingManagementComponent }
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
