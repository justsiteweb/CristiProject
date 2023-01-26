import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { DataValue } from 'ag-grid-community';
import { map, ReplaySubject, startWith, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { DataDoc } from 'src/app/common/datadoc';
import { DenialType } from 'src/app/common/denialtype';
import { District } from 'src/app/common/district';
import { Judge } from 'src/app/common/judge';
import { Jurisdiction } from 'src/app/common/jurisdiction';
import { VenueType } from 'src/app/common/venuetype';
import { Violation } from 'src/app/common/violation';
import { DistrictService } from 'src/app/services/district.service';
import { FouritemService } from 'src/app/services/fouritem.service';
import { GenerateService } from 'src/app/services/generate.service';
import { GetdataService } from 'src/app/services/getNames/getdata.service';
import { JudgeService } from 'src/app/services/judge.service';
import { UserdataService } from 'src/app/services/user/userdata.service';
import { CaselistService } from '../caselist/service/caselist.service';
import { User } from '../login/common/user';

@Component({
  selector: 'app-editcasemodal',
  templateUrl: './editcasemodal.component.html',
  styleUrls: ['./editcasemodal.component.css']
})
export class EditcasemodalComponent implements OnInit, OnDestroy {

  //neccesaryData for Districts
  districts: District[] = [];
  filteredDistricts: District[] = [];
  selectedDistrictValue!: District;
  statusDistrict = false;

  //neccesaryData for District Judges
  districtJudges: Judge[] = [];
  filteredDistrictJudges: Judge[] = [];
  selectedDistrictJudgeValue!: Judge;
  statusDistrictJudge = false;

  //neccesaryData for Magistrate Judges
  magistrateJudges: Judge[] = [];
  filteredMagistrateJudges: Judge[] = [];
  selectedMagistrateJudgeValue!: Judge;
  statusMagistrateJudge = false;



  //NEcessary data
  protected denialTypeList: DenialType[] = [];
  protected jurisdictionList: Jurisdiction[] = [];
  protected venueTypeList: VenueType[] = [];
  protected violationList: Violation[] = [];



  //general FORMS
  formDistrictGroup!: FormGroup;
  formDistrictJudgeGroup!: FormGroup;
  formMagistrateJudgeGroup!: FormGroup;
  defaultDistrictJudge!: Judge;
  defaultMagistrateJudge!: Judge;


  //Temp objects
  objDenialSelected!: DenialType;
  objJurisdictionSelected!: Jurisdiction;
  objVenueTypeForm!: VenueType;
  objViolationArray!: Violation[];



  //TypeForForms
  typeExempaleForms!: string | null;


  //FORMS
  violationForm = new FormControl(this.objViolationArray, [Validators.required])
  denialTypeForm = new FormControl(this.objDenialSelected, [Validators.required])
  jurisdictionForm = new FormControl(this.objJurisdictionSelected, [Validators.required])
  venueTypeForm = new FormControl(this.objVenueTypeForm, [Validators.required])
  localCounselForm = new FormControl('', [Validators.required])
  aorPhvForm = new FormControl('', [Validators.required])
  opposingAttorneyForm = new FormControl('', [Validators.required])
  caseManagerForm = new FormControl('', [Validators.required])
  clientNameForm = new FormControl('', [Validators.required])
  defendantNameForm = new FormControl('', [Validators.required])
  defendantAbbreviationForm = new FormControl('', [Validators.required])
  caseNameForm = new FormControl('', [Validators.required])
  caseNumberForm = new FormControl('', [Validators.required])



  //CASE TEMP 
  caseTemp!: DataDoc;

  protected _onDestroy = new Subject<void>();


  //for Convert and set default
  arrayViolation: Violation[] = [];


  //PLUS PLUS VALUE A
  // creator_id: any;
  user: any;
  // createdOn!: Date;
  arrayNumbersToBeConverted: Array<number> = [];
  stringViolationNumbers: string = '';


  //Variables to send to be updated!
  district_id!: number;
  district_judge_id!: number;
  magistrate_judge_id!: number;
  venue_id!: number;
  jurisdiction_id!: number;
  denial_id!: number;
  violation!: string;
  localCounsel!: string;
  aorPHV!: string;
  opposingAttorney!: string;
  caseManager!: string;
  clientName!: string;
  defendantName!: string;
  defendantAbbreviation!: string;
  caseName!: string;
  caseNumber!: string;
  creator_id!: number;
  createdOn!: Date;


  //Models
  selectedDistrictModel!: District;
  selectedDistrictJudgeModel!: Judge;


  constructor(private districtService: DistrictService, private generateService: GenerateService,
    private userService: UserdataService, private getObjectsService: GetdataService, private judgeService: JudgeService, private router: Router,
    private fouritemService: FouritemService) { }

  //PANEL FOR METHODS
  ngOnInit() {
    this.allMethods()

    // this.violationForm.valueChanges.subscribe(response => {
    //   console.log(response)
    // })


  }

  allMethods() {
    this.createDistrictForm();
    this.createDistrictJudgeForm();
    this.createMagistrateJudgeForm()
    this.getMagistrateJudgeDefault();
    this.getDistrictJudgeDefault();
    this.listDenialType();
    this.listJurisdiction();
    this.listVenueType()
    this.listViolation()
    this.getCase()

    this.statusDistrict = true;
    this.statusDistrictJudge = true;
    this.statusMagistrateJudge = true;



    this.formDistrictGroup.get('selectedDistrict')?.valueChanges.subscribe(response => {
      this.district_id = response.district_id
      console.log("District Value" + this.district_id);
      this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.valueChanges.subscribe(response => {
        this.district_judge_id = response.district_judge_id
        console.log("DJ ID " + response.district_judge_id)
      })
    })

    



  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  updateJudges(event: MatAutocompleteSelectedEvent) {
    console.log("DIstrict EVENT" + event.option.value.district_name)

    this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.setValue(null)
    this.formMagistrateJudgeGroup.get('selectedMagistrateJudge')?.setValue(null)

    this.judgeService.getJudgeList(event.option.value.district_id, 1).subscribe((data: Judge[]) => {
      this.districtJudges = data;
      this.filteredDistrictJudges = data;
    });

    this.judgeService.getJudgeList(event.option.value.district_id, 2).subscribe((data: Judge[]) => {
      this.magistrateJudges = data;
      this.filteredMagistrateJudges = data;
    })


  }




  // District Form() ----------------------------------------------------------------------------------------
  createDistrictForm() {
    this.formDistrictGroup = new FormGroup({
      selectedDistrict: new FormControl(this.selectedDistrictValue, Validators.required),
    })
    this.formDistrictGroup.get('selectedDistrict')?.valueChanges.subscribe(response => {
      console.log('District is ', response);
      this.filterDistrictData(response);
    })
  }

  // District JUDGE Form() ----------------------------------------------------------------------------------------
  createDistrictJudgeForm() {
    this.formDistrictJudgeGroup = new FormGroup({
      selectedDistrictJudge: new FormControl(this.selectedDistrictJudgeValue, Validators.required)
    });
    this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.valueChanges.subscribe(response => {
      console.log('District Judge is ', response);
      this.filterDistrictJudgeData(response);
    });
  }


  // Magistrate JUDGE Form() ----------------------------------------------------------------------------------------
  createMagistrateJudgeForm() {
    this.formMagistrateJudgeGroup = new FormGroup({
      selectedMagistrateJudge: new FormControl(this.selectedMagistrateJudgeValue, Validators.required)
    });
    this.formMagistrateJudgeGroup.get('selectedMagistrateJudge')?.valueChanges.subscribe(response => {
      console.log('Magistrate Judge is ', response);
      this.filterMagistrateJudgeData(response);
    });
  }


  //METHODS to FIlter input 
  filterDistrictData(enteredDistrictData: string) {
    this.filteredDistricts = this.districts.filter(item => {
      return item.district_name.toLowerCase().indexOf(enteredDistrictData.toLowerCase()) > -1
    })
  }

  filterDistrictJudgeData(enteredDistrictJudgeData: string) {
    this.filteredDistrictJudges = this.districtJudges.filter(item => {
      return item.judge_name.toLowerCase().indexOf(enteredDistrictJudgeData.toLowerCase()) > -1
    })
  }

  filterMagistrateJudgeData(enteredMagistrateJudgeData: string) {
    this.filteredMagistrateJudges = this.magistrateJudges.filter(item => {
      return item.judge_name.toLowerCase().indexOf(enteredMagistrateJudgeData.toLowerCase()) > -1
    })
  }


  //METHODS to get VALUES from DATABASE
  getDistricts(district_id: number) {
    this.districtService.getDistrictList().subscribe((response: District[]) => {
      this.districts = response;
      this.filteredDistricts = response;

      if(district_id !== null || undefined){
      this.formDistrictGroup.get('selectedDistrict')?.setValue(this.districts[district_id]);
      }
    })
  }

  getDistrictJudge(district_id: number) {
    this.judgeService.getJudgeList(district_id, 1).subscribe((data: Judge[]) => {
      this.districtJudges = data;
      console.log(data)
      this.filteredDistrictJudges = data;
      // this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.setValue(this.defaultDistrictJudge);
    })
  }


  getMagistrateJudge(district_id: number) {
    this.judgeService.getJudgeList(district_id, 2).subscribe((data: Judge[]) => {
      this.magistrateJudges = data;
      console.log(data)
      this.filteredMagistrateJudges = data;
      // this.formMagistrateJudgeGroup.get('selectedMagistrateJudge')?.setValue(this.defaultMagistrateJudge);
    })
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





  //METHODS to display
  displayDistrict(district: District): string {
    return district && district.district_name ? district.district_name : '';
  }

  displayDistrictJudge(judge: Judge): string {
    return judge && judge.judge_name ? judge.judge_name : '';
  }

  displayMagistrateJudge(judge: Judge): string {
    return judge && judge.judge_name ? judge.judge_name : '';
  }




  /////////////////////////////////
  // Main Method to set all DATA and call methods

  getCase() {
    this.getObjectsService.getCase().subscribe((response: DataDoc) => {
      this.getDistricts(response.district_id - 1);
      this.caseTemp = response;
      this.getDistrictJudge(response.district_id);
      this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.setValue(this.defaultDistrictJudge);
      this.getMagistrateJudge(response.district_id)
      this.formMagistrateJudgeGroup.get('selectedMagistrateJudge')?.setValue(this.defaultMagistrateJudge);
      this.denialTypeForm.setValue(this.denialTypeList[response.denial_id - 1])
      this.jurisdictionForm.setValue(this.jurisdictionList[response.jurisdiction_id - 1])
      this.venueTypeForm.setValue(this.venueTypeList[response.venue_id - 1])
      this.setViolationValues(response.violation);
      this.localCounselForm.setValue(response.localCounsel)
      this.aorPhvForm.setValue(response.aorPHV)
      this.opposingAttorneyForm.setValue(response.opposingAttorney)
      this.caseManagerForm.setValue(response.caseManager)
      this.clientNameForm.setValue(response.clientName)
      this.defendantNameForm.setValue(response.defendantName)
      this.defendantAbbreviationForm.setValue(response.defendantAbbreviation)
      this.caseNameForm.setValue(response.caseName)
      this.caseNumberForm.setValue(response.caseNumber)
    })
  }

  //GET DEFAULT VALUE
  getDistrictJudgeDefault() {
    this.judgeService.getDistrictJudge().subscribe(data =>
      this.defaultDistrictJudge = data)
  }

  getMagistrateJudgeDefault() {
    this.judgeService.getMagistrateJudge().subscribe(data =>
      this.defaultMagistrateJudge = data)
  }


  setViolationValues(violation: string) {


    let numbers = violation.match(/\d+/g)
    let numberArray = numbers?.map(Number);
    let arrFinal = numberArray?.map(x => x - 1)

    console.log("LEngth " + arrFinal?.length)

    // console.log(this.violationList[0])

    for (let index = 0; index < arrFinal!.length; index++) {
      this.arrayViolation[index] = this.violationList[arrFinal![index]]
      console.log(this.arrayViolation[index].name)
    }

    this.arrayViolation.forEach(e => {
      console.log(e)
    })


    this.violationForm.setValue(this.arrayViolation)
  }




  onSubmit2() {
    console.log("District " + this.formDistrictGroup.get('selectedDistrict')?.value.district_id)
    console.log("D Judge " + this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.value.judge_id)
    console.log("M Judge " + this.formMagistrateJudgeGroup.get('selectedMagistrateJudge')?.value.judge_id)
    console.log("Local Counsel " + this.localCounselForm.value)
    console.log(this.venueTypeForm.value?.venue_id)
  }




  onSubmit() {
    if (this.violationForm.value !== null) {
      for (let index = 0; index < this.violationForm.value.length; index++) {
        this.arrayNumbersToBeConverted[index] = this.violationForm.value[index].violation_id;
      }
    }
    else {
      console.log("eroorrrr")
    }
    this.stringViolationNumbers = this.arrayNumbersToBeConverted.join(',')
    console.log(this.stringViolationNumbers)
    console.log(this.selectedDistrictJudgeModel)


    this.generateService.update(new DataDoc(
      // this.formDistrictGroup.get('selectedDistrict')?.value.district_id,
      // this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.value.judge_id as number,
      // this.formMagistrateJudgeGroup.get('selectedMagistrateJudge')?.value.judge_id,
      // this.jurisdictionForm.value?.jurisdiction_id as number,
      // this.denialTypeForm.value?.denial_id as number,
      // this.venueTypeForm.value?.venue_id as number,
      // this.stringViolationNumbers as string,
      // this.localCounselForm.value as string,
      // this.aorPhvForm.value as string,
      // this.opposingAttorneyForm.value as string,
      // this.caseManagerForm.value as string,
      // this.clientNameForm.value as string,
      // this.defendantNameForm.value as string,
      // this.defendantAbbreviationForm.value as string,
      // this.caseNameForm.value as string,
      // this.caseNumberForm.value as string,
      // this.creator_id,
      // this.createdOn
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


       // this.formDistrictGroup.get('selectedDistrict')?.value.district_id as number,
        // this.formDistrictJudgeGroup.get('selectedDistrictJudge')?.value.district_judge_id as number,
        // this.formMagistrateJudgeGroup.get('selectedMagistrateJudge')?.value.magistrate_judge_id as number,
        // this.jurisdictionForm.value?.jurisdiction_id as number,
        // this.denialTypeForm.value?.denial_id as number,
        // this.venueTypeForm.value?.venue_id as number ,
        // this.stringViolationNumbers as string,
        // this.localCounselForm.value as string,
        // this.aorPhvForm.value as string,
        // this.opposingAttorneyForm.value as string,
        // this.caseManagerForm.value as string,
        // this.clientNameForm.value as string,
        // this.defendantNameForm.value as string,
        // this.defendantAbbreviationForm.value as string,
        // this.caseNameForm.value as string,
        // this.caseNumberForm.value as string,
        // this.creator_id,
        // this.createdOn