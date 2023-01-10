import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingDetailPageComponent } from './onboarding-detail-page.component';

describe('OnboardingDetailPageComponent', () => {
  let component: OnboardingDetailPageComponent;
  let fixture: ComponentFixture<OnboardingDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
