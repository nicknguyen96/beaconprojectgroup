import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  public password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*^&]).{8,16}')]);
  public confirm = new FormControl('');

  // server url
  public BASE_URL = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient
    ) { }

  // initialize formgroup
  public regForm: FormGroup = this.fb.group({
    email: this.email,
    password: this.password,
    confirm: this.confirm
  }, { validator: this.confirmValidator('password', 'confirm') });

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
      const { email, password } = this.regForm.getRawValue();
      const body = JSON.stringify({email, password});
      const headers = { 'content-type': 'application/json', 'email': email };
      const options = {headers: headers};

      this.http.post(`${this.BASE_URL}/auth/register`, body, options).subscribe((res: any) => {
        
        if (res.status == 401) {
          alert('You must use the same email that the registration link was sent to. If this is a mistake, please contact HR.');
        }

        if (res.status == 409) {
          alert('There is already an account with this email. If this is a mistake, please contact HR.');
        }

        if (res.status == 201) {
          localStorage.setItem('token', res.token)
          localStorage.setItem('employee', JSON.stringify(res.employee))
          localStorage.setItem('isHR', res.isHR)
          console.log(res);
          alert('Account created successfully!');
          this.router.navigate(['/employee']);
        }
      });
    }
    else {
      alert("There are still errors with your form. Please make sure all requirements have been fulfilled.");
    }

  }

  ngOnInit() {
    // verify register token when user opens the register page
    this.route.queryParams.subscribe(params => { 
      this.regToken = params.token;
      localStorage.setItem('token', params.token);
      
      this.http.get(`${this.BASE_URL}/auth/verifyRgToken`)
      .subscribe((res: any) => {
        if (res.status !== 200) { 
          this.router.navigate(['/forbidden']);
          localStorage.removeItem('token');
        };
      })
    });
  }

}
