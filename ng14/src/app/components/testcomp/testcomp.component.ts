import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_SELECTION_LIST_VALUE_ACCESSOR } from '@angular/material/list';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil, take, Subscription, Observable, empty } from 'rxjs';
import { District } from 'src/app/common/district';
import { Judge } from 'src/app/common/judge';
import { DistrictService } from 'src/app/services/district.service';
import { FouritemService } from 'src/app/services/fouritem.service';
import { JudgeService } from 'src/app/services/judge.service';
import { GetdataService } from 'src/app/services/getNames/getdata.service';
import { DataDoc } from 'src/app/common/datadoc';
import { DenialType } from 'src/app/common/denialtype';
import { Jurisdiction } from 'src/app/common/jurisdiction';
import { VenueType } from 'src/app/common/venuetype';
import { Violation } from 'src/app/common/violation';


@Component({
  selector: 'app-test',
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.css']
})
export class TestcompComponent {

  constructor(
    private judgeService: JudgeService,
    private servie: GetdataService
  ) { }

  //general items
  @Input() caseTemp!: DataDoc;


  @Input() denialTypeList!: DenialType[];
  @Input() jurisdictionList!: Jurisdiction[]
  @Input() venueTypeList!: VenueType[];
  @Input() violationList!: Violation[];


  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();


  //Districts of Dropdowm
  @Input() districtsDataSource!: District[];
  public formDistrictsData!: FormGroup;
  public inputDistrictFilter: FormControl = new FormControl();
  public districtsFilter: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);



  //District Judges of Dropdown
  public districtJudgesArray!: Judge[];

  public formDistrictJudgeData = new FormGroup({
    districtJudgeSelect: new FormControl('')
  });

  public filteredDistrictJudge: ReplaySubject<Judge[]> = new ReplaySubject<Judge[]>();
  public districtJudgeFilterCtrl: FormControl = new FormControl();



  private _changeSubscription!: Subscription;
  protected _onDestroy = new Subject<void>();



  ngOnInit() {
    this.createDistrictForm()
    this.displayData()

    // this.filteredDistrictJudge.next(this.districtJudgesArray?.slice());
    // // this.filteredDistrictJudge.next(this.districtJudgesArray?.slice());
    // this.formDistrictJudgeData.get('districtJudgeSelect')?.setValue(this.districtJudgesArray[0].judge_name);
    // this.districtJudgeFilterCtrl.valueChanges
    // .pipe(takeUntil(this._onDestroy))
    // .subscribe(() => {
    //   this.filterDistrictJudge();
    // });


  }

  ngOnDestroy() {
    if (this._changeSubscription !== null) {
      this._changeSubscription.unsubscribe();
    }
  }


  //DISTRICT DROPDOWN
  createDistrictForm() {
    this.formDistrictsData = new FormGroup({
      districtSelect: new FormControl(''),
    });
    if (this.districtsDataSource !== undefined) {
      this.setInitialDistrictValue();
      this._changeSubscription = this.formDistrictsData.valueChanges.subscribe(
        (data) => {
          this.onSelectionChange.emit(data);
        }
      );
      this.inputDistrictFilter.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterDistrictsData();
        });
    }

    // this.listDistrictJudges(this.caseTemp?.district_id, 1);


    
  
  

  }

  protected filterDistrictsData() {
    if (!this.districtsDataSource) {
      return;
    }
    // get the search keyword
    let search = this.inputDistrictFilter.value;
    if (!search) {
      this.districtsFilter.next(this.districtsDataSource.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the districts
    this.districtsFilter.next(
      this.districtsDataSource.filter(
        (data) => data.district_name.toLowerCase().indexOf(search) > -1
      )
    );
  }


  setInitialDistrictValue() {
    // console.log("District ID = " + this.caseTemp.district_id)
    this.districtsFilter.next(this.districtsDataSource.slice());
    this.formDistrictsData.get('districtSelect')?.setValue(this.districtsDataSource[this.caseTemp?.district_id - 1]);
  }







  /////FINISHED OF DISTRICT DROPDOWN

  protected filterDistrictJudge() {
    if (!this.districtJudgesArray) {
      return;
    }
    // get the search keyword
    let search = this.districtJudgeFilterCtrl.value;
    if (!search) {
      this.filteredDistrictJudge.next(this.districtJudgesArray.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the district judges
    this.filteredDistrictJudge.next(
      this.districtJudgesArray.filter(djudge => djudge.judge_name.toLowerCase().indexOf(search) > -1)
    );
  }

  setInitialDistrictJudgeValue() {
    
  }






  updateJudges(event: District) {

    console.log("ahha"+event.district_id)
  }









  onSubmit(): void {
    console.log(this.formDistrictsData.value);
  }



  displayData() {
    console.log("Start Display")
    console.log(this.caseTemp?.district_id);
    console.log(this.caseTemp)
  }



  // listMagistrateJudges(id: number, type: number) {
  //   console.log("List appeared Magistrate Judges" + id);
  //   this.judgeService.getJudgeList(id, type).subscribe(
  //     data => {
  //       this.msh = data;
  //       console.log(this.magistrateJudgeList)
  //     }
  //   )
  //   return this.magistrateJudgeList;
  // }

  listDistrictJudges(id: number, type: number) {
    console.log("List appeared Districts Judge" + id);
    this.judgeService.getJudgeList(id, type).subscribe(
      data => {
        this.districtJudgesArray = data;
      }
    )
    return this.districtJudgesArray;
  }

}
