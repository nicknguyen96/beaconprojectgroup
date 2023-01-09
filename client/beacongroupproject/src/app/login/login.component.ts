import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { AuthActions } from '../store/user/auth.actions';
import { selectEmployee } from '../store/user/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private store: Store, private authService: AuthService) {}

  loginForm = new FormBuilder().group({
    email: '',
    password: '',
  });


  employee$ = this.store.select(selectEmployee)
  onSubmit() {
    const {email, password} = this.loginForm.getRawValue();
    this.authService.login(email, password).subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
    
  }
}
