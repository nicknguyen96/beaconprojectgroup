import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardingComponent } from './components/boarding/boarding.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { LoginComponent } from './components/login/login.component';
import { OnboardingDetailPageComponent } from './components/onboarding-detail-page/onboarding-detail-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { VisaManagementHrComponent } from './components/visa-management-hr/visa-management-hr.component';
import { HousingManagementComponent } from './components/housing-management/housing-management.component';
import { VisaManagementEmployeeComponent } from './components/visa-management-employee/visa-management-employee.component';
import { HousingManagementEmployeeComponent } from './components/housing-management-employee/housing-management-employee.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeGuard } from './services/employee.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'employee', children: [
      { path: '', component: EmployeeHomeComponent },
      { path: 'boarding', component: BoardingComponent },
      { path: 'visa', component: VisaManagementEmployeeComponent },
      { path: 'housing', component: HousingManagementEmployeeComponent }
    ]
  },
  {
    path: 'hr', canActivate: [EmployeeGuard], children: [
      { path: '', redirectTo: '/hr/hiringManagement', pathMatch: 'full' },
      { path: 'hiringManagement', component: HiringManagementComponent },
      { path: 'hiringManagement/:employeeid', component: OnboardingDetailPageComponent },
      { path: 'visaManagement', component: VisaManagementHrComponent },
      { path: 'housingManagement', component: HousingManagementComponent }
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
