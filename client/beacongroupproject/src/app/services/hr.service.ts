import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class HrService {
    constructor(private http: HttpClient) { }

    sendInvitationEmail(email: string) {
        return this.http.post(`${BACKEND_URL}/hr/sendInvitation`, { email });
    }

    getEmployeeList() {
        return this.http.get(`${BACKEND_URL}/hr/sortUser`);
    }

    updateOnBoardingStatus(onboardingStatus: string, employeeid: string, message: string) {
        return this.http.put(`${BACKEND_URL}/hr/update-boarding-status`, { onboardingStatus, employeeid, message })
    }

    getHousingList() {
        return this.http.get(`${BACKEND_URL}/housing`);
    }
}