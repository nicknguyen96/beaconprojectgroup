import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // get the reg token 
  public regToken: string;

  // form related stuff
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,16}')]);
  public confirm = new FormControl('');

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService, private router: Router) { }


  // initialize formgroup
  public regForm: FormGroup = this.fb.group({
    email: this.email,
    password: this.password,
    confirm: this.confirm
  },  { validator: this.confirmValidator('password', 'confirm')});

  public confirmValidator(password: string, confirm: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confPass = formGroup.controls[confirm];
      if (confPass.errors && !confPass.errors.confirmedValidator) return;
    
      if (pass.value !== confPass.value) confPass.setErrors({ confirmedValidator: true });
      else confPass.setErrors(null);
    };
  };





  public registerUser(): void {
    if (!this.regForm.invalid) {
      console.log("User passes validation! Pass onto backend (WIP)");
      console.log(this.regForm.getRawValue());
    }
    else {
      console.log("There are still errors with your form!");
    }

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
