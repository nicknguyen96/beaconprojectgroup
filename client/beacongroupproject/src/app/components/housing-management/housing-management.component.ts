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

  houseIdforDelete: string = '';

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

  ngOnInit(): void {
    this.store.dispatch(HrActions.getHousingList({data: 'some data'}));
    this.housingList$ = this.store.select(housingList);
    
  }
}
