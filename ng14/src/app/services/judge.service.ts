import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Judge } from '../common/judge';

@Injectable({
  providedIn: 'root'
})


export class JudgeService {


  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getJudgeList(district_id: number, jtype: number): Observable<Judge[]> {

    const searchJudgesUrl = `${this.baseUrl}/judges/search/findByJtypeAndDistrict?district=${district_id}&jtype=${jtype}`;

    return this.httpClient.get<GetResponseJudges>(searchJudgesUrl).pipe(
      map(response => response._embedded.judges)
    );
  }


  getDistrictJudge(){
    const searchJudgesUrl = `${this.baseUrl}/get_district_judge`
    return this.httpClient.get<Judge>(searchJudgesUrl).pipe(
      map(response => response)
    );
  }

  getMagistrateJudge(){
    const searchJudgesUrl = `${this.baseUrl}/get_magistrate_judge`
    return this.httpClient.get<Judge>(searchJudgesUrl).pipe(
      map(response => response)
    );
  }
}

interface GetResponseJudges {
  _embedded: {
    judges: Judge[];
  }
}




