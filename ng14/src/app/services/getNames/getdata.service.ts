import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDoc } from 'src/app/common/datadoc';
import { District } from 'src/app/common/district';

@Injectable({
  providedIn: 'root'
})

export class GetdataService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  
  getDistrictName() {
    return this.httpClient.get(this.baseUrl + "district_name", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }


  getDistrictJudgeName() {
    return this.httpClient.get(this.baseUrl + "district_judge_name", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }

  getMagistrateJudgeName(){
    return this.httpClient.get(this.baseUrl + "magistrate_judge_name", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }


  getVenueTypeName() {
    return this.httpClient.get(this.baseUrl + "venue_type_name", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }

  getJurisdictionName() {
    return this.httpClient.get(this.baseUrl + "jurisdiction_name", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }


  getDenialTypeName() {
    return this.httpClient.get(this.baseUrl + "denial_type_name", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }


  getCreatorName(){
    return this.httpClient.get(this.baseUrl + "creator_name", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }

  getCreatorSurname() {
    return this.httpClient.get(this.baseUrl + "creator_surname", {responseType: 'text'}).pipe(
      map(response => response)
    );
  }

  getViolationsName(): Observable<Array<JSON>> {
    return this.httpClient.get<Array<JSON>>(this.baseUrl + "violations_name").pipe(
      map(response => response)
    );
  }


  getCase(): Observable<DataDoc> {
    return this.httpClient.get<DataDoc>(this.baseUrl + "get_case").pipe(
      map(response => response)
    );
  }







}
