import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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

  loginForm = new FormBuilder().group({
    email: '',
    password: '',
  });


  employee$ = this.store.select(selectEmployee);

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
    }
    else {

      const { email, password } = this.loginForm.getRawValue();
      this.authService.login(email, password).subscribe()
    }

  }

  ngOnInit(): void {
  }
}
