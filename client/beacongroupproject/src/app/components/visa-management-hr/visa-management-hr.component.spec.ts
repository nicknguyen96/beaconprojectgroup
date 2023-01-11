import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaManagementHrComponent } from './visa-management-hr.component';

describe('VisaManagementHrComponent', () => {
  let component: VisaManagementHrComponent;
  let fixture: ComponentFixture<VisaManagementHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaManagementHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaManagementHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
