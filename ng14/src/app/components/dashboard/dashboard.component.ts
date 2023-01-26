import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSelect } from '@angular/material/select';
import { Data } from '@angular/router';
import { ReplaySubject, Subject, takeUntil, take, distinct, map } from 'rxjs';
import { DataDoc } from 'src/app/common/datadoc';
import { District } from 'src/app/common/district';
import { Judge } from 'src/app/common/judge';
import { DistrictService } from 'src/app/services/district.service';
import { GenerateService } from 'src/app/services/generate.service';
import { JudgeService } from 'src/app/services/judge.service';
import { UserdataService } from 'src/app/services/user/userdata.service';
import { User } from '../login/common/user';




@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit, OnDestroy {


  constructor(private districtService: DistrictService, private judgeService: JudgeService, private generateService: GenerateService,
    private userService: UserdataService) { }


  // @ViewChild(MatAccordion)
  // accordion!: MatAccordion;

  violationForm = new FormControl('', [Validators.required])
  denialTypeForm = new FormControl('', [Validators.required])
  jurisdictionForm = new FormControl('', [Validators.required])
  venueTypeForm = new FormControl('', [Validators.required])


  violationList = [
    { id: 1, name: '15 USC 1681e(b)' },
    { id: 2, name: '15 USC 1681i' },
    { id: 3, name: '15 USC 1681s-2' },
    { id: 4, name: 'Cal. Civ. Code1 1785.14' },
    { id: 5, name: 'Cal. Civ. Code1 1785.16' },
    { id: 6, name: 'Cal. Civ. Code1 1785.25' }
  ];

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
  private districtJudgeName!: string;
  private magistrateJudgeName!: string;
  private venueType!: string;
  private jurisdiction!: string;
  private denialType!: string;
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

  user!: User;




  // selectedDistrict: any;

  protected districts: District[] = [];
  protected djudges: Judge[] = [];
  protected mjudges: Judge[] = [];


  /** control for the MatSelect filter keyword */
  public districtFilterCtrl: FormControl = new FormControl();
  public djudgeFilterCtrl: FormControl = new FormControl();
  public mjudgeFilterCtrl: FormControl = new FormControl();





  /** list of banks filtered by search keyword */
  public filteredDistricts: ReplaySubject<District[]> = new ReplaySubject<District[]>();
  public filteredDistrictJudge: ReplaySubject<Judge[]> = new ReplaySubject<Judge[]>();
  public filteredMagistrateJudge: ReplaySubject<Judge[]> = new ReplaySubject<Judge[]>();




  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  updateJudges(event: District) {
    this.listMagistrateJudges(event.district_id, 2);
    this.listDistrictJudges(event.district_id, 1);

  }




  ngOnInit() {

    this.showUserData();

    this.districts = this.listDistricts();
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
    this.districtJudgeName = event.judge_name;
  }

  getMagistrateJudgeName(event: Judge) {
    console.log(event.judge_name)
    this.magistrateJudgeName = event.judge_name;
  }

  getVenueType(event: string) {
    console.log(event)
    this.venueType = event;
  }

  getJurisdiction(event: string) {
    console.log(event)
    this.jurisdiction = event
  }

  getDenialType(event: string) {
    console.log(event)
    this.denialType = event
  }

  

  getViolation(event: JSON) {
    
    // let value = JSON.stringify(event)
    // this.violationList.forEach(function (value1) {
    //   if (value == value1.name) {
    //     console.log("good")
    //   }
    //   else{
    //     console.log("bad")
    //   }

    // });
    this.violation = JSON.stringify(event)
    console.log(this.violation)
  }

  // getLocalCounsel(event: string) {
  //   console.log(event)
  //   this.localCounsel = event;
  // }

  // getAorPHV(event: string) {
  //   console.log(event)
  //   this.aorPHV = event;
  // }

  // getOpposingAttorney(event: string) {
  //   console.log(event)
  //   this.opposingAttorney = event;
  // }

  // getCaseManager(event: string) {
  //   console.log(event)
  //   this.caseManager = event;
  // }

  // getClientName(event: string) {
  //   console.log(event)
  //   this.clientName = event;
  // }

  // getDefendantName(event: string) {
  //   console.log(event)
  //   this.defendantName = event;
  // }

  // getDefendantAbbreviation(event: string) {
  //   console.log(event)
  //   this.defendantAbbreviation = event;
  // }

  // getCaseName(event: string) {
  //   console.log(event)
  //   this.caseName = event
  // }

  // getCaseNumber(event: string) {
  //       console.log(event)
  //   this.caseNumber = event
  // }


  onSubmit() {
    // this.generateService.send(new DataDoc(
    //   this.districtJudgeName,
    //   this.magistrateJudgeName,
    //   this.venueType,
    //   this.jurisdiction,
    //   this.denialType,
    //   this.violation,
    //   this.localCounsel,
    //   this.aorPHV,
    //   this.opposingAttorney,
    //   this.caseManager,
    //   this.clientName,
    //   this.defendantName,
    //   this.defendantAbbreviation,
    //   this.caseName,
    //   this.caseNumber,
      
    // ))
  }

  showUserData(){
    this.userService.getUserData().subscribe(
      data => {
        this.user = data;
      })

    console.log(this.user)
  }

  


}

