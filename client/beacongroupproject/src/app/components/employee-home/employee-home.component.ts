import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { selectEmployee } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent {

  public profilePicture = new FormControl('');

  public firstName = new FormControl('', [Validators.required]);
  public middleName = new FormControl('');
  public lastName = new FormControl('', [Validators.required]);
  public preferredName = new FormControl('');

  public email = new FormControl('', [Validators.required]);
  public cellphone = new FormControl('', [Validators.required]);
  public workphone = new FormControl('');

  public ssn = new FormControl('', [Validators.required]);
  public dob = new FormControl('', [Validators.required]);
  public gender = new FormControl('', [Validators.required]);

  public address = new FormControl('', [Validators.required]);
  public buildNum = new FormControl('');
  public city = new FormControl('', [Validators.required]);
  public state = new FormControl('', [Validators.required]);
  public pcode = new FormControl('', [Validators.required]);

  public isCitizen = new FormControl('', [Validators.required]);
  public citizenStatus = new FormControl('');
  public notCitizenStatus = new FormControl('');
  public f1File = new FormControl('');
  public otherDesc = new FormControl('');
  public startDate = new FormControl('');
  public endDate = new FormControl('');

  public dLicense = new FormControl('', [Validators.required]);
  public licenseNum = new FormControl('');
  public licenseExpiration = new FormControl('');
  public licenseFile = new FormControl('');
  public carMake = new FormControl('');
  public carModel = new FormControl('');
  public carColor = new FormControl('');

  public referFirstName = new FormControl('');
  public referMiddleName = new FormControl('');
  public referLastName = new FormControl('');
  public referEmail = new FormControl('');
  public referPhone = new FormControl('');
  public referRelationship = new FormControl('');

  public emergencyFirstName = new FormControl('', [Validators.required]);
  public emergencyMiddleName = new FormControl('');
  public emergencyLastName = new FormControl('', [Validators.required]);
  public emergencyEmail = new FormControl('', [Validators.required]);
  public emergencyPhone = new FormControl('', [Validators.required]);
  public emergencyRelationship = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder,private router: Router, private authService: AuthService, private store: Store, private employeeService: EmployeeService, private onboardingService: OnboardingService) { }

  employee$ = this.store.select(selectEmployee);

  editForm: FormGroup = this.fb.group({
    profilePicture: this.profilePicture,

    firstName: this.firstName,
    middleName: this.middleName,
    lastName: this.lastName,
    preferredName: this.preferredName,

    email: this.email,
    cellphone: this.cellphone,
    workphone: this.workphone,

    ssn: this.ssn,
    dob: this.dob,
    gender: this.gender,

    address: this.address,
    buildNum: this.buildNum,
    city: this.city,
    state: this.state,
    pcode: this.pcode,

    isCitizen: this.isCitizen,
    citizenStatus: this.citizenStatus,
    notCitizenStatus: this.notCitizenStatus,
    f1File: this.f1File,
    otherDesc: this.otherDesc,
    startDate: this.startDate,
    endDate: this.endDate,

    dLicense: this.dLicense,
    licenseNum: this.licenseNum,
    licenseExpiration: this.licenseExpiration,
    licenseFile: this.licenseFile,
    carMake: this.carMake,
    carModel: this.carModel,
    carColor: this.carColor,

    referFirstName: this.referFirstName,
    referMiddleName: this.referMiddleName,
    referLastName: this.referLastName,
    referEmail: this.referEmail,
    referPhone: this.referPhone,
    referRelationship: this.referRelationship,

    emergencyFirstName: this.emergencyFirstName,
    emergencyMiddleName: this.emergencyMiddleName,
    emergencyLastName: this.emergencyLastName,
    emergencyEmail: this.emergencyEmail,
    emergencyPhone: this.emergencyPhone,
    emergencyRelationship: this.emergencyRelationship
  });

  ngOnInit() {
    this.onboardingService.onboardingIntercepter();
    this.authService.getEmployee();
    if(!this.authService.userIsLoggedIn()) { 
      this.router.navigateByUrl('/login');
    }
  }
}
