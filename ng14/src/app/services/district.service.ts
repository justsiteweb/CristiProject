import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { District } from '../common/district';

@Injectable({
  providedIn: 'root'
})


export class DistrictService {

  private baseUrl = 'http://localhost:8080/api/districts';

  constructor(private httpClient: HttpClient) { }

  getDistrictList(): Observable<District[]> {
    return this.httpClient.get<Array<District>>(this.baseUrl).pipe(
      map(response => response)
    );
  }

}







// interface GetResponseDistricts  {
//   _embedded: {
//     districts: District[];
//   }
  
//}