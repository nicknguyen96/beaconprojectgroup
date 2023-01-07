import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/user/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private store: Store){}


  loginForm = new FormBuilder().group({
    email: '',
    password: '',
    confirmPassword: ''
  })

  invalid: boolean = false

  onSubmit() {
    const {email, password, confirmPassword} = this.loginForm.getRawValue();
    console.log(email, password, confirmPassword)
    if(password !== confirmPassword) {
      return alert('passwords do not match')
    }

    this.store.dispatch(AuthActions.login({ email, password }))
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(data => {
      const {email, password, confirmPassword}: any = data
      if(email.length <= 5) {
        this.invalid = true
      }
      if(email.length > 5) {
        this.invalid = false
      }
    })
  }

}
