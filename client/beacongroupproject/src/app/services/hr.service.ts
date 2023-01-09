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
}