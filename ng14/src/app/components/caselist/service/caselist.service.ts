import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaselistService {

  detailsData: any;
  url = 'http://localhost:8080/api/caselist';  // URL to web api
  urlPostId = 'http://localhost:8080/api/send_case_id'
  listStatus:boolean  = false;


  constructor(
    private http: HttpClient) {
  }

  getCaseList() {
    console.log("get case list");
    return this.http.get<any>(this.url).pipe(
      map((response: any) => response)
    )
  }


  sendCaseId(id: number) {
    console.log(id)
    console.log("try post caseID:");
    this.http.post(this.urlPostId, id,{responseType: 'text'}).subscribe((response: any) => {
        console.log(JSON.stringify(response))
    });
}




  getDataForDetailsPage() {
   return this.detailsData;
  }



  setDataForDetailsPage(value: any) {
    console.log("Setted")
    console.log(value)
    this.detailsData = value;
  }


  getListStatus(){
    return this.listStatus;
  }

  setListStatus(listStatus:boolean){
    this.listStatus = listStatus;
  }
  

}
