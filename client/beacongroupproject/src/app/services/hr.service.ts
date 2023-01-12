import { HttpClient, HttpParams } from '@angular/common/http';
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

    getFile(fileName: string) {
        console.log(fileName);
        this.http.get(`${BACKEND_URL}/user/getFile/${fileName}`).subscribe((data: any) => {
            if (data.status === 200) {
                window.open(data.data, "_blank")
            } else {
                alert("Something wrong when getting this file")
            }
        })
    }

    getHousingList() {
        return this.http.get(`${BACKEND_URL}/housing`);
    }

    deleteHousing(houseId: string) {
        return this.http.delete(`${BACKEND_URL}/housing/delete-house/?id=${houseId}`);
    }

    addHousing(houseInfo: any) {
        return this.http.post(`${BACKEND_URL}/housing/create-house`, {houseInfo});
    }
    updateFileStatus(employeeid: string, fileName: string, message: string, status: string) {
        console.log(employeeid, fileName, message, status);
        return this.http.put(`${BACKEND_URL}/hr/updateFileStatus`, { employeeid, fileName, message, status });
    }
}