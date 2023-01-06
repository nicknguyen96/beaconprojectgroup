import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  loginForm = new FormBuilder().group({
    email: '',
    password: '',
    confirmPassword: ''
  })

  onSubmit() {
    
  }

  ngOnInit() {

  }

}
