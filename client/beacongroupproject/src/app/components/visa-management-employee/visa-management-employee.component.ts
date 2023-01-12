import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from 'src/app/store/user/auth.actions';
import { selectEmployee } from 'src/app/store/user/auth.selector';

@Component({
  selector: 'app-visa-management-employee',
  templateUrl: './visa-management-employee.component.html',
  styleUrls: ['./visa-management-employee.component.scss']
})
export class VisaManagementEmployeeComponent implements OnInit{
  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
  ) { }

  employee$: Observable<any>;

  currentFile: File;
  fileName: string;
  typeFile: string;
  employeeid: string;
  canUploadNew: boolean = false;
  validFileName = ['optreceipt', 'optead', 'i983', 'i20'];
  nextFileShouldUpload: string = '';

  onChange(event: any, fileName: string) {
    this.currentFile = event.target.files[0];
    this.typeFile = fileName;
    console.log(this.currentFile);
    console.log(fileName);
    this.uploadFile();
  }

  uploadFile() {
    const form = new FormData();
    this.employee$.subscribe(employee => {
      console.log(employee.email);
      if (this.typeFile == 'newFile') {
        const length = employee.details.legalStatus.workStatus.fileUpload.length;
        this.fileName = `${this.validFileName[length]}-${employee.email}`
      } else {
        this.fileName = this.typeFile;
      }

      form.append('image', this.currentFile, this.fileName);
      form.append('employeeid', employee.id);

      this.store.dispatch(AuthActions.uploadFile({ form }))

    })
  }

  ngOnInit(): void {
    this.employee$ = this.store.select(selectEmployee);
    this.store.select(selectEmployee).subscribe(employee => {
      const length = employee.details.legalStatus.workStatus.fileUpload.length;
      console.log(length < this.validFileName.length)
      if (length < this.validFileName.length && employee.details.legalStatus.workStatus.fileUpload[length - 1].status == "Approved") {
        this.canUploadNew = true;
        this.nextFileShouldUpload = this.validFileName[length];
        console.log(this.canUploadNew)

      }
    })
  }
}
