import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewcasemodalComponent } from '../newcasemodal/newcasemodal.component';
import { CaselistService } from './service/caselist.service';
import { DataDoc } from 'src/app/common/datadoc';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FilterManager, GridApi, SelectionChangedEvent } from 'ag-grid-community';
import { AngularFrameworkComponentWrapper } from 'ag-grid-angular';
import { EditcasemodalComponent } from '../editcasemodal/editcasemodal.component';
import { DeletecasemodalComponent } from '../deletecasemodal/deletecasemodal.component';
import { style } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './caselist.component.html',
  styleUrls: ['./caselist.component.css']
})
export class CaselistComponent implements OnInit {

  private gridApi!: GridApi;

  constructor(public dialog: MatDialog, private caseListService: CaselistService, private router: Router) { }

  selectedItem!: any;
  paramss: any;
  selectedDataStatus: boolean = false;
  selectedData!: any;
  statusList: boolean = false;

  ngOnInit() {
    this.displayCaseList();

  }

  openDialogCreateNewCase() {


    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(NewcasemodalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogEditTheCase() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(EditcasemodalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  openDialogDeleteTheCase() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DeletecasemodalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  caseList: DataDoc[] = [];
  dataJSON!: JSON;

  // caseId!:number;


  columnDefs = [

    //  {field: 'id'},

    { headerName: 'Case Name', field: 'caseName', sortable: true, width: 400, filter: true },

    { headerName: 'Client Name', field: 'clientName', sortable: true, filter: true, width: 1000, },


    { headerName: 'Data Created', field: 'createdOn', sortable: true, filter: true },


  ];

  onGridReady(params: { api: GridApi<any>; }) {
    this.gridApi = params.api;
  }


  public displayCaseList() {
    this.caseListService.getCaseList().subscribe(
      data => {
        this.caseList = data;
        console.log("Case List" + this.caseList)
      });
  }



  getSelectedRowData() {
    this.selectedDataStatus = true;
    this.selectedData = this.gridApi.getSelectedRows();
    var value = this.selectedData[0]
    console.log("Set caseID in backend")
    this.caseListService.sendCaseId(value.id)
  }

 

  allowDetailsData() {
    console.log("allowData")
    console.log(this.selectedData)
    this.caseListService.setDataForDetailsPage(this.selectedData)
  }



}


