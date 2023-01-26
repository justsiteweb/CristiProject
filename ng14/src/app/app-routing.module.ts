import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaselistComponent } from './components/caselist/caselist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { JudgelistComponent } from './components-judgelist/judgelist/judgelist.component';
import { ErrorComponent } from './components/login/errorpage/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestcompComponent } from './components/testcomp/testcomp.component';
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';


// const routes: Routes = [
//   { path: '', component: LoginComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'navbar', component: NavbarComponent },

//   { path: 'dashboard', component: DashboardComponent, outlet: 'aux' },
//   { path: 'caselist', component: CaselistComponent, outlet: 'aux' },
//   { path: 'judgelist', component: JudgelistComponent , outlet: 'aux'},


//   { path: '**', redirectTo: '' }
// ];



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, },
  {
    path: 'navbar', component: NavbarComponent,
    children: [
      { path: '', component: CaselistComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'caselist', component: CaselistComponent, },
      { path: 'details', component: DetailsComponent, },
      { path: 'judgelist', component: JudgelistComponent },
    ]
  },
  
  { path: 'error', component: ErrorComponent, },
  { path: 'user', component: UserdashboardComponent, },
  { path: '**', redirectTo: '' }
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
