import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { AuthActions } from '../store/user/auth.actions';
import { selectToken } from '../store/user/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private store: Store, private authService: AuthService, private router: Router) {}

  loginForm = new FormBuilder().group({
    email: '',
    password: '',
  });

  onSubmit() {
    const {email, password} = this.loginForm.getRawValue();
    this.authService.login(email, password).subscribe()
  }

  ngOnInit() {
    const isLog = this.authService.userIsLoggedIn()
    if(isLog) {
      alert('already logged in')
      this.router.navigateByUrl('/')
    }
  }
}
