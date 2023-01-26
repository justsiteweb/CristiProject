import { Component, NgModule, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserdataService } from 'src/app/services/user/userdata.service';
import { User } from '../login/common/user';
// import {NgOptimizedImage} from '@angular/common'



@Component({
  selector: 'app-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserdataService) { }
  ngOnInit() {
    this.showUserData();
  }


  showUserData() {
    this.userService.getUserData().subscribe(
      data => {
        this.user = data;
      })
  }

}
