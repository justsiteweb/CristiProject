import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DataDoc } from 'src/app/common/datadoc';
import { GetdataService } from 'src/app/services/getNames/getdata.service';
import { CaselistService } from '../caselist/service/caselist.service';

@Component({
  selector: 'app-root',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private caseListService: CaselistService, private router: Router, private getDataService: GetdataService) {
  }


  // data to display from database

  displayData!: DataDoc;
  districtName!:string ;
  districtJudgeName!: string;
  magistrateJudgeName!: string;
  venueTypeName!: string;
  jurisdictionName!: string;
  denialTypeName!: string;
  creatorName!: string;
  creatorSurname!: string | number;
  violationNames!: Array<JSON>;
  top:string='';







  ngOnInit(): void {
    this.getCase();
    this.getDistrictName();
    this.getCreatorSurname();
    this.getCreatorName();
    this.getDenialTypeName()
    this.getDistrictJudgeName()
    this.getMagistrateJudgeName();
    this.getJurisdictionName();
    this.getVenueTypeName();
    this.getViolationsName();  
  }


  getCase() {
    this.getDataService.getCase().subscribe(
      data => {
        this.displayData = data;
      }
    )
  }

  getDistrictName() {
    this.getDataService.getDistrictName().subscribe(
      data => {
        this.districtName = data
      }
    )
  }


  getDistrictJudgeName() {
    this.getDataService.getDistrictJudgeName().subscribe(
      data => {
        this.districtJudgeName = data;
      }
    )
  }

  getMagistrateJudgeName() {
    this.getDataService.getMagistrateJudgeName().subscribe(
      data => {
        this.magistrateJudgeName = data;
      }
    )
  }


  getVenueTypeName() {
    this.getDataService.getVenueTypeName().subscribe(
      data => {
        this.venueTypeName = data;
      }
    )
  }


  getJurisdictionName() {
    this.getDataService.getJurisdictionName().subscribe(
      data => {
        this.jurisdictionName = data;
      }
    )
  }


  getDenialTypeName() {
    this.getDataService.getDenialTypeName().subscribe(
      data => {
        this.denialTypeName = data;
      }
    )
  }


  getCreatorName() {
    this.getDataService.getCreatorName().subscribe(
      data => {
        this.creatorName = data;
      }
    )
  }

  getCreatorSurname() {
    this.getDataService.getCreatorSurname().subscribe(
      data => {
        this.creatorSurname = data;
      }
    )
  }


  getViolationsName() {
    this.getDataService.getViolationsName().subscribe(
      data => {
        this.violationNames = data;
      }
    )
  }









}


