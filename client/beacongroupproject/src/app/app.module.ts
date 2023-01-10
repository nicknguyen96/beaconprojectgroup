import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthEffects } from './store/user/auth.effects';
import { authReducer } from './store/user/auth.reducer';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { CustomInterceptor } from './services/custom-interceptor.service';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { hrReducer } from './store/hr/hr.reducer';
import { HrEffects } from './store/hr/hr.effects';
import { BoardingComponent } from './components/boarding/boarding.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    EmployeeHomeComponent,
    HiringManagementComponent,
    BoardingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ auth: authReducer, hr: hrReducer }),
    EffectsModule.forRoot([AuthEffects, HrEffects])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
