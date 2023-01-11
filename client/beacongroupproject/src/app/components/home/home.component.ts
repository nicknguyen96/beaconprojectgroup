import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HrActions } from 'src/app/store/hr/hr.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private store: Store) {}

  emailInviteForm = new FormBuilder().group({
    email: ''
  });

  onInvite(): void {
    const { email } = this.emailInviteForm.getRawValue();
    console.log(email);
    
    this.store.dispatch(HrActions.getHousingList({data: 'empty list'}));
    
  }
}
