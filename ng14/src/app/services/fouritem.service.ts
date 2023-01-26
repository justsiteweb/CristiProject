import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DenialType } from '../common/denialtype';
import { District } from '../common/district';
import { Jurisdiction } from '../common/jurisdiction';
import { VenueType } from '../common/venuetype';
import { Violation } from '../common/violation';

@Injectable({
  providedIn: 'root'
})
export class FouritemService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getVenueTypeList(): Observable<VenueType[]> {
    return this.httpClient.get<Array<VenueType>>(this.baseUrl+"/venuetype").pipe(
      map(response => response)
    );
  }


  getJurisdictionList(): Observable<Jurisdiction[]> {
    return this.httpClient.get<Array<Jurisdiction>>(this.baseUrl+"/jurisdiction").pipe(
      map(response => response)
    );
  }


  getDenialTypeList(): Observable<DenialType[]> {
    return this.httpClient.get<Array<DenialType>>(this.baseUrl+"/denialtype").pipe(
      map(response => response)
    );
  }


  getViolationList(): Observable<Violation[]> {
    return this.httpClient.get<Array<Violation>>(this.baseUrl+"/violation").pipe(
      map(response => response)
    );
  }


  
}
