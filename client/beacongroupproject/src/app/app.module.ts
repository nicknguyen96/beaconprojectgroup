import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthEffects } from './store/user/auth.effects';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { CustomInterceptor } from './services/custom-interceptor.service';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HrEffects } from './store/hr/hr.effects';
import { OnboardingDetailPageComponent } from './components/onboarding-detail-page/onboarding-detail-page.component';
import { BoardingComponent } from './components/boarding/boarding.component';
import { OnboardingEffects } from './store/onboarding/onboarding.effects';

import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { VisaManagementHrComponent } from './components/visa-management-hr/visa-management-hr.component';
import { HousingManagementComponent } from './components/housing-management/housing-management.component';
import { VisaManagementEmployeeComponent } from './components/visa-management-employee/visa-management-employee.component';
import { HousingManagementEmployeeComponent } from './components/housing-management-employee/housing-management-employee.component';
import { HousingEffects } from './store/housing/housing.effects';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToPhoneNumberPipe } from './pipes/to-phone-number.pipe';
import { storeReducer } from './store';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EmployeeHomeComponent,
    HiringManagementComponent,
    OnboardingDetailPageComponent,
    BoardingComponent,
    ForbiddenComponent,
    VisaManagementHrComponent,
    HousingManagementComponent,
    VisaManagementEmployeeComponent,
    HousingManagementEmployeeComponent,
    NotFoundComponent,
    ToPhoneNumberPipe,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(storeReducer),
    EffectsModule.forRoot([AuthEffects, HrEffects, , OnboardingEffects, HousingEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: true,
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
