import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.scss']
})
export class BoardingComponent {

  public progressBar: number=0;
  public pfpUrl: string='';
  public userEmail: string='(placeholder)@gmail.com';
  public currPage: number=1;

  public profilePicture = new FormControl('', [Validators.required]);

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


  constructor(private fb: FormBuilder) { }

    // initialize formgroup
    public boardForm: FormGroup = this.fb.group({
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
    switch(where) {
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
}
