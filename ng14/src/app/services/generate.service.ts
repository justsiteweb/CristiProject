import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataDoc } from '../common/datadoc';



@Injectable({
    providedIn: 'root'
})
export class GenerateService {

    url = 'http://localhost:8080/api/';  // URL to web api


    constructor(
        private http: HttpClient) {
    }

    send(data: DataDoc) {
        console.log("try post:");
        this.http.post(this.url+'save', data).subscribe((response: any) => {
            console.log(response)
            if (response == null){
                console.log("error")
            }
        });
    }

    
    update(data: DataDoc) {
        console.log("try post:");
        this.http.post(this.url+'update', data).subscribe((response: any) => {
            console.log(response)
            if (response == null){
                console.log("error")
            }
        });

    }
}