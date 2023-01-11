import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HrActions } from 'src/app/store/hr/hr.actions';
import { housingList } from 'src/app/store/hr/hr.selector';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit{
  constructor(private store: Store) {}

  housingList$: Observable<any>;

  ngOnInit(): void {
    this.store.dispatch(HrActions.getHousingList({data: 'some data'}));
    this.housingList$ = this.store.select(housingList);
    
  }
}
