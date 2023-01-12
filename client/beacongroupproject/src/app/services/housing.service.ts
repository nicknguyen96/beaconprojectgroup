import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class HousingService {

    constructor(private http: HttpClient) { }

    getHouse(houseid: string) {
        return this.http.get(`${BACKEND_URL}/user/getHouse/${houseid}`);
    }

    createReport(title: string, description: string, houseid: string) {
        return this.http.post(`${BACKEND_URL}/report/create`, { title, description, houseid });
    }

    createComment(description: string, reportid: string) {
        return this.http.post(`${BACKEND_URL}/report/comment`, { description, reportid });
    }
}