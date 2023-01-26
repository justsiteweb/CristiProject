import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/components/login/common/user';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  url = 'http://localhost:8080/api/auth/user';  // URL to web api

  constructor(
    private http: HttpClient) {
  }

  getUserData() {
    console.log("try post user:");
   return this.http.get<any>(this.url).pipe(
    map((response: any) => response)
  )
  }
}
