import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HrActions } from 'src/app/store/hr/hr.actions';
import { housingList } from 'src/app/store/hr/hr.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { selectAuthState } from 'src/app/store/user/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.scss']
})
export class HousingManagementComponent implements OnInit{
  constructor(private store: Store, private router: Router) {}

  houseInfo = new FormBuilder().group({
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    bed: ['', Validators.required],
    table: ['', Validators.required],
    matress: ['', Validators.required],
    chair: ['', Validators.required]
  })

  housingList$: Observable<any>;
  
  public showDetail(house: any) {
    /**********************************************
     * following part is for Facility Information *
     **********************************************/
    // display reports(parent node of comments)
    const reports = document.createElement('div');
    reports.innerHTML = `
      <hr>
      <p style="color:gray" class="m-1">Facility Reports</p>
    `;
    reports.setAttribute('style', 'font-size:0.8rem;');
    for(let currentReport of house.summary.reports) {
      // display all info and comments for current report
      let report = document.createElement('div');
      report.innerHTML = `
        <p class="m-0 p-0">Author</p>
        <p class="border border-success rounded p-2">${currentReport.author.user.firstName} ${currentReport.author.user.lastName}</p>
        <p class="m-0 p-0">Description</p>
        <p class="border border-success rounded p-2 mb-0">${currentReport.description}</p><br>
        <p class="m-0 p-0">Comments</p>
      `;
      const comments = document.createElement('div');
      for (let comment of currentReport.comments) {
        const newComment = document.createElement('div');
        newComment.setAttribute('class', 'p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end mb-5');
        newComment.innerHTML = `
          <p>Author: ${comment.author ? comment.author : 'Anonymous User'}</p>
          <p>Comment: ${comment.description}</p>
          <p>Created at: ${comment.timeStamp}</p>
        `;
        comments.appendChild(newComment);
      }
      report.appendChild(comments)
      reports.appendChild(report);
    };

    /**********************************************
     * following part is for Tenants Information *
     **********************************************/
    const employees = document.createElement('div');
    employees.innerHTML = `
      <h5>Employee Information</h5>
    `;
    for (let employee of house.tenants) {
      const newEmployee = document.createElement('div');
      newEmployee.innerHTML = `
        <p>Tenant: 
          <a 
            href='/hr/hiringManagement/${employee._id}'
            target='__blank'
            class="text-decoration-none bg-primary text-light p-1 rounded">
            ${employee.user.firstName} ${employee.user.lastName}</a>
        </p>
      `;
      employees.appendChild(newEmployee);
    };

    // display house detail(parent node of reports and comments)
    const modalBody = document.getElementById('modalBody');
    const content = document.createElement('div');
    content.innerHTML = `
    <div class="">
      <h6>Address: ${house.address}</h6><hr>
      <h5>Facility Information</h5>
      <div class="">
        <p style="color:gray" class="m-1">Basic Information</p>
        <div style="font-size:0.8rem;">
          <p class="m-1"><span class="text-decoration-underline">${house.summary.furniture.beds}</span> beds</p>
          <p class="m-1"><span class="text-decoration-underline">${house.summary.furniture.matresses}</span> matresses</p>
          <p class="m-1"><span class="text-decoration-underline">${house.summary.furniture.tables}</span> tables</p>
          <p class="m-1"><span class="text-decoration-underline">${house.summary.furniture.chairs}</span> chairs</p>
        </div>
      </div>
    </div>`;
    content.appendChild(reports);
    content.appendChild(employees);
    modalBody.appendChild(content);
  };

  public closeDetail() {
    document.getElementById('modalBody').innerHTML = '';
  };

  public deleteHousing(id: string) {
    this.store.dispatch(HrActions.deleteHousing({id}));
    this.housingList$ = this.store.select(housingList);
  }

  public addNewHouse() {
    if (
      this.houseInfo.controls.address.errors ||
      this.houseInfo.controls.city.errors ||
      this.houseInfo.controls.state.errors ||
      this.houseInfo.controls.zip.errors ||
      this.houseInfo.controls.fullName.errors ||
      this.houseInfo.controls.phone.errors ||
      this.houseInfo.controls.email.errors ||
      this.houseInfo.controls.bed.errors ||
      this.houseInfo.controls.matress.errors ||
      this.houseInfo.controls.chair.errors ||
      this.houseInfo.controls.table.errors
    ) {
      alert("All Fields are required, Please check again")
    } else {
      const houseInfo = {
        address: `${this.houseInfo.controls.address.value}, ${this.houseInfo.controls.city.value}, ${this.houseInfo.controls.state.value} ${this.houseInfo.controls.zip.value}`,
        landlord: {
          fullName: this.houseInfo.controls.fullName.value,
          phoneNumber: this.houseInfo.controls.phone.value,
          email: this.houseInfo.controls.email.value
        },
        summary: {
          furniture: {
            beds: this.houseInfo.controls.bed.value,
            matresses: this.houseInfo.controls.matress.value,
            tables: this.houseInfo.controls.table.value,
            chairs: this.houseInfo.controls.chair.value
          }
        }
      };

      this.store.dispatch(HrActions.addHousing({houseInfo}));
      this.housingList$ = this.store.select(housingList);
      alert('Successfully Add New House');
      this.houseInfo.reset();
    }
  }

  public employee : any;

  employee$ = this.store.select(selectAuthState).subscribe((data) => {
    this.employee = data;
  });

  ngOnInit(): void {
    console.log('Current User:', this.employee);
    console.log(this.employee.isHR);
    if (this.employee.isHR == false) {
      this.router.navigateByUrl('/forbidden');
    } 
    else {
    this.store.dispatch(HrActions.getHousingList({data: 'some data'}));
    this.housingList$ = this.store.select(housingList);
    }
  }
}
