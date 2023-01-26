import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from './common/role';
import { User } from './common/user';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  username!: string;
  password!: string;
  users: User[] = [];
  role!: Role;



  loggedStatus!: boolean;

  constructor(
    private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }

  submit() {
    console.log(this.username, this.password)
    this.loginService
      .sendUsernameAndPassword(this.username, this.password)
      .subscribe((response: any) => {

        if (response === null){
          return this.router.navigate(['/']);
        }
        else{
          this.role = response;

          console.log(this.role.name)
  
          const str = 'Admin';
          const str2 = 'User';
  
          if (this.role.name === str) {
            this.loggedStatus = true;
            return this.router.navigate(['/navbar/caselist']);
          }
          else if (this.role.name === str2) {
            this.loggedStatus = true;
            return this.router.navigate(['/user']);
          }
          else {
            this.loggedStatus = false;
            return this.router.navigate(['/']);
          }
        }
       
      });


  }
}



