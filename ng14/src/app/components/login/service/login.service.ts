import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataDoc } from 'src/app/common/datadoc';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:8080/api/auth/signin';  // URL to web api


  constructor(
    private http: HttpClient) {
  }

  sendUsernameAndPassword(username: string, password: string) {
    console.log("try post user:");
   return this.http.post<any>(this.url, { username, password });

  }
}
