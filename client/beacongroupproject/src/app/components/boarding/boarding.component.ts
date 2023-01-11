import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  public userEmail: string = '(placeholder)@gmail.com';
  public currPage: number = 1;

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

  public emergencyFirstName = new FormControl('');
  public emergencyMiddleName = new FormControl('');
  public emergencyLastName = new FormControl('');
  public emergencyEmail = new FormControl('');
  public emergencyPhone = new FormControl('');
  public emergencyRelationship = new FormControl('');


  constructor(private fb: FormBuilder, private onboardingService: OnboardingService, private store: Store) { }

  // initialize formgroup
  boardForm: FormGroup = this.fb.group({
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

  public submitApp(): void {
    console.log(this.boardForm.getRawValue());
  }

  public onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.pfpUrl = event.target.result;
      }
    }
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

  onSubmit(): any {
    if (this.boardForm.invalid) {
      return alert("Form is not valid, please check if all fields are filled")
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
      onBoardingStatus: 'Submitted',
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

  employee$: Observable<any>;
  ngOnInit(): void {
    // it checks if the employee is already approved then it should move to employee main page
    this.onboardingService.onboardingApprove();
    this.employee$ = this.store.select(selectEmployee);
    this.employee = this.store.select(selectEmployee).subscribe(data => {
      console.log(data);
      return data
    });
  }
}
