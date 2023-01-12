import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { selectAuthState, selectEmployee } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent {

  // personal info
  public profilePicture = new FormControl('');
  public firstName = new FormControl('', [Validators.required]);
  public middleName = new FormControl('');
  public lastName = new FormControl('', [Validators.required]);
  public preferredName = new FormControl('');
  public email = new FormControl('', [Validators.required]);
  public ssn = new FormControl('', [Validators.required]);
  public dob = new FormControl('', [Validators.required]);
  public gender = new FormControl('', [Validators.required]);

  // address info
  public address = new FormControl('', [Validators.required]);
  public buildNum = new FormControl('');
  public city = new FormControl('', [Validators.required]);
  public state = new FormControl('', [Validators.required]);
  public pcode = new FormControl('', [Validators.required]);


  // contact info
  public cellphone = new FormControl('', [Validators.required]);
  public workphone = new FormControl('');


  // work status
  public workStatus = new FormControl('', [Validators.required]);
  public startDate = new FormControl('');
  public endDate = new FormControl('');

  // emergency info
  public emergencyFirstName = new FormControl('', [Validators.required]);
  public emergencyMiddleName = new FormControl('');
  public emergencyLastName = new FormControl('', [Validators.required]);
  public emergencyEmail = new FormControl('', [Validators.required]);
  public emergencyPhone = new FormControl('', [Validators.required]);
  public emergencyRelationship = new FormControl('', [Validators.required]);

  // documents
  public licenseFile = new FormControl('');
  public f1File = new FormControl('');


  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService, private store: Store, private employeeService: EmployeeService, private onboardingService: OnboardingService) { }

  public editPersonalForm: FormGroup = this.fb.group({
    profilePicture: this.profilePicture,
    firstName: this.firstName,
    middleName: this.middleName,
    lastName: this.lastName,
    preferredName: this.preferredName,
    email: this.email,
    ssn: this.ssn,
    dob: this.dob,
    gender: this.gender
  });

  public editAddressForm: FormGroup = this.fb.group({
    address: this.address,
    buildNum: this.buildNum,
    city: this.city,
    state: this.state,
    pcode: this.pcode
  });

  public editContactForm: FormGroup = this.fb.group({
    cellphone: this.cellphone,
    workphone: this.workphone
  });

  public editEmploymentForm: FormGroup = this.fb.group({
    workStatus: this.workStatus,
    startDate: this.startDate,
    endDate: this.endDate
  });

  public editEmergencyForm: FormGroup = this.fb.group({
    emergencyFirstName: this.emergencyFirstName,
    emergencyMiddleName: this.emergencyMiddleName,
    emergencyLastName: this.emergencyLastName,
    emergencyEmail: this.emergencyEmail,
    emergencyPhone: this.emergencyPhone,
    emergencyRelationship: this.emergencyRelationship
  });

  public editDocumentsForm: FormGroup = this.fb.group({
    f1File: this.f1File,
    licenseFile: this.licenseFile
  });



  public employee : any;

  employee$ = this.store.select(selectAuthState).subscribe((data) => {
    this.employee = data;
  });

  ngOnInit() {
    // this.onboardingService.onboardingIntercepter();
    this.authService.getEmployee();
    if(!this.authService.userIsLoggedIn()) { 
      this.router.navigateByUrl('/login');
    }
    console.log(this.employee);
  }

  public onEditPersonal(): void {
    console.log(this.editPersonalForm.getRawValue());
  };

  public onEditAddress(): void {
    console.log(this.editAddressForm.getRawValue());
  };

  public onEditContact(): void {
    console.log(this.editContactForm.getRawValue());
  };

  public onEditEmployment(): void {
    console.log(this.editEmploymentForm.getRawValue());
  };

  public onEditEmergency(): void {
    console.log(this.editEmergencyForm.getRawValue());
  };

  public onEditDocuments(): void {
    console.log(this.editDocumentsForm.getRawValue());
  };
}
