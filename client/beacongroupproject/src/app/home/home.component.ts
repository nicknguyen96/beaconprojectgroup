import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private store: Store, private authService: AuthService) {}

  emailInviteForm = new FormBuilder().group({
    email: ''
  });

  onInvite(): void {
    const { email } = this.emailInviteForm.getRawValue();
    console.log(email);
  }
}
