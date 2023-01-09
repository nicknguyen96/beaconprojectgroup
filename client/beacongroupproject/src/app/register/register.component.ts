import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public regToken: string;
  

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService, private router: Router) { }




  public form = this.fb.group({
    email: '',
    password: '',
    confirm: ''
  });

  public registerUser(): boolean {
    const { email, password, confirm } = this.form.getRawValue();

    // email criteria
    let re0 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation
    if (!re0.test(email!)) {
      alert("Email is invalid!");
      return false;
    }

    // check if email exists in db already

    // password criteria
    if (password!.length < 8 || password!.length > 16) {
      alert('Password must be between 8 and 16 characters!');
      return false;
    } 

    let re1 = /[0-9]/; // nums
    let re2 = /[a-z]/; // lowers
    let re3 = /[A-Z]/; // caps
    let re4 = /^\w+$/; // special chars

    if (!re1.test(password!) || !re2.test(password!) || !re3.test(password!) || re4.test(password!)) {
      alert("Passwords must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character!"); 
      return false;
    }

    if (password != confirm) {
      alert('Passwords must match!');
      return false;
    } 

    console.log("User passes validation! Pass onto backend (WIP)");
    console.log(this.form.getRawValue());
    return true;
  }

  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.regToken = params['token'];
        console.log("Your register token:");
        console.log(this.regToken);
    });
    const isLog: any = this.authService.userIsLoggedIn()
    if(isLog) {
      alert('already logged in')
      this.router.navigateByUrl('/')
    } 
    
  }

}
