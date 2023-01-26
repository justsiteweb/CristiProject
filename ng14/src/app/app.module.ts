import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialExampleModule } from 'src/material.module';
import { CaselistComponent } from './components/caselist/caselist.component';
import { JudgelistComponent } from './components-judgelist/judgelist/judgelist.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogContent, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AgGridModule } from 'ag-grid-angular';
import { NewcasemodalComponent } from './components/newcasemodal/newcasemodal.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/login/errorpage/error/error.component';
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { EditcasemodalComponent } from './components/editcasemodal/editcasemodal.component';
import { DeletecasemodalComponent } from './components/deletecasemodal/deletecasemodal.component';
import { TestcompComponent } from './components/testcomp/testcomp.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    CaselistComponent,
    JudgelistComponent,
    NewcasemodalComponent,
    LoginComponent,
    ErrorComponent,
    UserdashboardComponent,
    DetailsComponent,
    EditcasemodalComponent,
    DeletecasemodalComponent,
    TestcompComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MaterialExampleModule,//
    HttpClientModule,//
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatAutocompleteModule,
    AgGridModule,
    
  
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    CaselistComponent
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

