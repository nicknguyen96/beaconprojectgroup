import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadingAction } from 'src/app/store/loading/loading.action';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../../store/user/auth.actions';
import { selectToken, selectEmployee } from '../../store/user/auth.selector';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store, private authService: AuthService, private router: Router) { }

  isShowPassword : boolean = false;

   toggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
   }

  public employee$ = this.store.select(selectEmployee);
  public loginForm: FormGroup = new FormBuilder().group({
    email: '',
    password: '',
  });


  onSubmit(): void {
    const { email, password } = this.loginForm.getRawValue();
    this.store.dispatch(loadingAction.loading());
    this.store.dispatch(AuthActions.login({ email, password }))

  }


  ngOnInit() {
    this.authService.getEmployee();
    if (this.authService.userIsLoggedIn()) {
      alert('You are already logged in!');
      this.employee$.subscribe(data => {
        if (data.isHR) {
          this.router.navigateByUrl('/hr/hiringManagement');
        } else {
          this.router.navigateByUrl('/employee');
        }
      })
    }
  }
}
