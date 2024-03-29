import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { ToPhoneNumberPipe } from 'src/app/pipes/to-phone-number.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { OnboardingAction } from 'src/app/store/onboarding/onboarding.actions';
import { selectEmployee } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.scss']
})
export class BoardingComponent implements OnInit {

  public progressBar: number = 0;
  public pfpUrl: string = '';
  public currPage: number = 1;

  public profilePicture = new FormControl('');

  public firstName = new FormControl('', [Validators.required]);
  public middleName = new FormControl('');
  public lastName = new FormControl('', [Validators.required]);
  public preferredName = new FormControl('');

  public phoneNumber = new FormControl('', [Validators.required]);

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


  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private onboardingService: OnboardingService,
    private store: Store,
    private http: HttpClient
  ) { }
  employee$ = this.store.select(selectEmployee);

  // initialize formgroup
  boardForm: FormGroup = this.fb.group({
    profilePicture: this.profilePicture,

    firstName: this.firstName,
    middleName: this.middleName,
    lastName: this.lastName,
    preferredName: this.preferredName,
    phoneNumber: this.phoneNumber,

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

  public submitApp(): void {
    console.log(this.boardForm.getRawValue());
  }


  image: any;

  selectedFile: File;

  public onSelectFile(event: any, fileType: string) {

    // just to make the image appear in the circle once the user selects it
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.pfpUrl = event.target.result
      this.image = reader.result as string;
    };

    reader.readAsDataURL(event.target.files[0]);

    return this.onboardingService.onboardingUploadFile(event, fileType)
  }


  public delete(): void {
    this.pfpUrl = null;
  }

  public goPage(where: string): void {
    switch (where) {
      case 'next': {
        if (this.progressBar < 100) this.progressBar += 25;
        if (this.currPage < 5) this.currPage += 1;
        break;
      }
      default: {
        if (this.progressBar > 0) this.progressBar -= 25;
        if (this.currPage > 1) this.currPage -= 1;
        break;
      }
    }
  }

  private findInvalidControls() {
    const invalid = [];
    const controls = this.boardForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

  onSubmit(): any {

    console.log(this.boardForm)
    const invalidControl = this.findInvalidControls();
    console.log(invalidControl)
    if (this.boardForm.invalid) {
      return alert("ERROR: There are still some required fields you have not filled out!");
    }

    const { firstName, lastName, middleName, preferredName,
      profilePicture, address, buildNum, city, state, pcode,
      phoneNumber, carMake, carModel, carColor, ssn, dob,
      gender, citizenStatus, notCitizenStatus,
      f1File, otherDesc, startDate, endDate, licenseNum,
      licenseExpiration, licenseFile, referFirstName, referMiddleName,
      referLastName, referEmail, referPhone, referRelationship,
      emergencyFirstName, emergencyMiddleName, emergencyLastName,
      emergencyEmail, emergencyPhone, emergencyRelationship, } = this.boardForm.getRawValue();



    const joinedAddress = `${address}, ${buildNum}, ${city}, ${state} ${pcode}`

    const employeeDetails = {
      firstName,
      lastName,
      middleName,
      preferredName,
      profilePicture,
      currentAddress: joinedAddress,
      phoneNumber,
      car: {
        make: carMake,
        model: carModel,
        color: carColor
      },
      SSN: ssn,
      DOB: dob,
      gender: gender,
      legalStatus: {
        status: citizenStatus,
        workStatus: {
          visaTitle: notCitizenStatus,
          issuedDate: startDate,
          expirationDate: endDate,
          fileUpload: [
            { fileName: f1File, }
          ],
        }
      },
      driversLicense: {
        number: licenseNum,
        expiration: licenseExpiration,
        picture: licenseFile
      },
      onboardingStatus: 'Submitted',
      emergencyContact: {
        firstName: emergencyFirstName,
        lastName: emergencyLastName,
        middleName: emergencyMiddleName,
        phone: emergencyPhone,
        email: emergencyEmail,
        relationship: emergencyRelationship
      },
      referenceContact: {
        firstName: referFirstName,
        lastName: referLastName,
        middleName: referMiddleName,
        phone: referPhone,
        email: referEmail,
        relationship: referRelationship
      }

    }
    this.store.dispatch(OnboardingAction.updateOnboarding({ employeeDetails }))
  }

  employee: any;

  ngOnInit(): void {
    // it checks if the employee is already approved then it should move to employee main page
    this.onboardingService.onboardingApprove();
    this.employee$ = this.store.select(selectEmployee);
    this.store.select(selectEmployee).subscribe(data => {
      this.employee = data
    });
    this.boardForm.valueChanges.pipe(
      map(form => form.phoneNumber)
    ).subscribe((phoneNumber: any) => {
      
    })
    console.log(this.employee);
  }
}
