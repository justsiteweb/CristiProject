import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { DataDoc } from 'src/app/common/datadoc';
import { District } from 'src/app/common/district';
import { Judge } from 'src/app/common/judge';
import { DistrictService } from 'src/app/services/district.service';
import { GenerateService } from 'src/app/services/generate.service';
import { JudgeService } from 'src/app/services/judge.service';
import { UserdataService } from 'src/app/services/user/userdata.service';
import { User } from '../login/common/user';
import { CaselistComponent } from '../caselist/caselist.component';
import { CaselistService } from '../caselist/service/caselist.service';
import { Router } from '@angular/router';
import { FouritemService } from 'src/app/services/fouritem.service';
import { DenialType } from 'src/app/common/denialtype';
import { Jurisdiction } from 'src/app/common/jurisdiction';
import { VenueType } from 'src/app/common/venuetype';
import { Violation } from 'src/app/common/violation';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-newcasemodal',
  templateUrl: './newcasemodal.component.html',
  styleUrls: ['./newcasemodal.component.css']
})
export class NewcasemodalComponent implements OnInit {

  constructor(private districtService: DistrictService, private judgeService: JudgeService, private generateService: GenerateService,
    private userService: UserdataService, private formBuilder: FormBuilder, private caseListService: CaselistService, private fouritemService: FouritemService, private router: Router) { }


  // @ViewChild(MatAccordion)
  // accordion!: MatAccordion;


  obj!: Violation;

  violationForm = new FormControl('', [Validators.required])


  denialTypeForm = new FormControl('', [Validators.required])
  jurisdictionForm = new FormControl('', [Validators.required])
  venueTypeForm = new FormControl('', [Validators.required])


  // violationList = [
  //   { id: 1, name: '15 USC 1681e(b)' },
  //   { id: 2, name: '15 USC 1681i' },
  //   { id: 3, name: '15 USC 1681s-2' },
  //   { id: 4, name: 'Cal. Civ. Code1 1785.14' },
  //   { id: 5, name: 'Cal. Civ. Code1 1785.16' },
  //   { id: 6, name: 'Cal. Civ. Code1 1785.25' }
  // ];


  sendDataForm!: FormGroup;


  localCounselForm = new FormControl('', [Validators.required])
  aorPhvForm = new FormControl('', [Validators.required])
  opposingAttorneyForm = new FormControl('', [Validators.required])
  caseManagerForm = new FormControl('', [Validators.required])
  clientNameForm = new FormControl('', [Validators.required])
  defendantNameForm = new FormControl('', [Validators.required])
  defendantAbbreviationForm = new FormControl('', [Validators.required])
  caseNameForm = new FormControl('', [Validators.required])
  caseNumberForm = new FormControl('', [Validators.required])



  //
  private district_judge_id!: number;
  private magistrate_judge_id!: number;
  private venue_id!: number;
  private jurisdiction_id!: number;
  private denial_id!: number;
  private violation!: string;

  localCounsel!: string;
  aorPHV!: string;
  opposingAttorney!: string;
  caseManager!: string;
  clientName!: string;
  defendantName!: string;
  defendantAbbreviation!: string;
  caseName!: string;
  caseNumber!: string;
  case_id!: number;



  creator_id!: number;
  createdOn!: Date;
  district_id!: number;

  user!: User;



  // selectedDistrict: any;

  protected districts: District[] = [];
  protected denialTypeList: DenialType[] = [];
  protected jurisdictionList: Jurisdiction[] = [];
  protected venueTypeList: VenueType[] = [];
  protected violationList: Violation[] = [];

  protected djudges: Judge[] = [];
  protected mjudges: Judge[] = [];


  /** control for the MatSelect filter keyword */
  public districtFilterCtrl: FormControl = new FormControl();
  public djudgeFilterCtrl: FormControl = new FormControl();
  public mjudgeFilterCtrl: FormControl = new FormControl();


  districtForm: FormControl = new FormControl('', Validators.required)
  districtJudgeForm: FormControl = new FormControl('', Validators.required)
  magistrateJudgeForm: FormControl = new FormControl('', Validators.required)



  /** list of banks filtered by search keyword */
  public filteredDistricts: ReplaySubject<District[]> = new ReplaySubject<District[]>();
  public filteredDistrictJudge: ReplaySubject<Judge[]> = new ReplaySubject<Judge[]>();
  public filteredMagistrateJudge: ReplaySubject<Judge[]> = new ReplaySubject<Judge[]>();




  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  updateJudges(event: District) {
    this.districtJudgeForm.setValue(null)
    this.magistrateJudgeForm.setValue(null)
    this.district_id = event.district_id;

    this.listMagistrateJudges(event.district_id, 2);
    this.listDistrictJudges(event.district_id, 1);
    // this.filteredMagistrateJudge.next(null);
    this.filteredDistrictJudge.next([]);
    this.filteredMagistrateJudge.next([]);

  }






  ngOnInit() {

    this.showUserData();


    this.districts = this.listDistricts();
    this.venueTypeList = this.listVenueType();
    this.violationList = this.listViolation();
    this.denialTypeList = this.listDenialType();
    this.jurisdictionList = this.listJurisdiction();


    console.log(this.districts)
    // load the initial bank list
    this.filteredDistricts.next(this.districts.slice());
    this.filteredDistrictJudge.next(this.djudges.slice());
    this.filteredMagistrateJudge.next(this.mjudges.slice());


    // listen for search field value changes --------------------------------------------------------------------------------------------
    this.districtFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDistrict();
      });

    this.djudgeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDistrictJudge();
      });

    this.mjudgeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMagistrateJudge();
      });
  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  //datafilters ------------------------------------------------------------------------------------------------------------------------------
  protected filterDistrict() {
    if (!this.districts) {
      return;
    }
    // get the search keyword
    let search = this.districtFilterCtrl.value;
    if (!search) {
      this.filteredDistricts.next(this.districts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the districts
    this.filteredDistricts.next(
      this.districts.filter(district => district.district_name.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterDistrictJudge() {
    if (!this.djudges) {
      return;
    }
    // get the search keyword
    let search = this.djudgeFilterCtrl.value;
    if (!search) {
      this.filteredDistrictJudge.next(this.djudges.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the district judges
    this.filteredDistrictJudge.next(
      this.djudges.filter(djudge => djudge.judge_name.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterMagistrateJudge() {
    if (!this.mjudges) {
      return;
    }
    // get the search keyword
    let search = this.mjudgeFilterCtrl.value;
    if (!search) {
      this.filteredMagistrateJudge.next(this.mjudges.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the magistrate judges
    this.filteredMagistrateJudge.next(
      this.mjudges.filter(mjudge => mjudge.judge_name.toLowerCase().indexOf(search) > -1)
    );
  }





  //lists from DataBase-----------------------------------------------------------------------------------------------------------------------
  listDistricts() {
    this.districtService.getDistrictList().subscribe(
      data => {
        this.districts = data;
      }
    )
    return this.districts;
  }


  listDenialType() {
    this.fouritemService.getDenialTypeList().subscribe(
      data => {
        this.denialTypeList = data;
      }
    )
    return this.denialTypeList;
  }


  listJurisdiction() {
    this.fouritemService.getJurisdictionList().subscribe(
      data => {
        this.jurisdictionList = data;
      }
    )
    return this.jurisdictionList;
  }



  listVenueType() {
    this.fouritemService.getVenueTypeList().subscribe(
      data => {
        this.venueTypeList = data;
      }
    )
    return this.venueTypeList;
  }



  listViolation() {
    this.fouritemService.getViolationList().subscribe(
      data => {
        this.violationList = data;
      }
    )
    return this.violationList;
  }




  listMagistrateJudges(id: number, type: number) {
    console.log("List appeared Magistrate Judges" + id);
    this.judgeService.getJudgeList(id, type).subscribe(
      data => {
        this.mjudges = data;
        console.log(this.mjudges)
      }
    )
    return this.mjudges;
  }

  listDistrictJudges(id: number, type: number) {
    console.log("List appeared Districts Judge" + id);
    this.judgeService.getJudgeList(id, type).subscribe(
      data => {
        this.djudges = data;
      }
    )
    return this.djudges;
  }






  /////methods to extract all data-----------------------------------------------------------------------------------------------------------------------

  getDistrictJudgeName(event: Judge) {
    console.log(event.judge_name)
    this.district_judge_id = event.judge_id;
  }

  getMagistrateJudgeName(event: Judge) {
    console.log(event.judge_name)
    console.log(event.judge_id)
    this.magistrate_judge_id = event.judge_id;
  }

  getVenueType(event: VenueType) {
    console.log(event)
    this.venue_id = event.venue_id;
  }

  getJurisdiction(event: Jurisdiction) {
    console.log(event)
    this.jurisdiction_id = event.jurisdiction_id
  }

  getDenialType(event: DenialType) {
    console.log(event)
    console.log(event.denial_id)
    this.denial_id = event.denial_id
  }



  getViolation(event: JSON) {
    this.violation = JSON.stringify(event)
    console.log(this.violation)
    console.log(event)
  }


  onSubmit() {
    console.log(this.creator_id)
    console.log(this.district_judge_id)
    this.generateService.send(new DataDoc(
      this.district_id,
      this.district_judge_id,
      this.magistrate_judge_id,
      this.venue_id,
      this.jurisdiction_id,
      this.denial_id,
      this.violation,
      this.localCounsel,
      this.aorPHV,
      this.opposingAttorney,
      this.caseManager,
      this.clientName,
      this.defendantName,
      this.defendantAbbreviation,
      this.caseName,
      this.caseNumber,
      this.creator_id,
      this.createdOn
    ));
    this.reloadCurrentRoute();
  }



  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }



  showUserData() {
    this.userService.getUserData().subscribe(
      data => {
        this.user = data;
        this.creator_id = this.user.id;
      })
  }


}
