 export class DataDoc {
   
    public district_id: number;
    public district_judge_id: number;
    public magistrate_judge_id: number;
    public venue_id: number;
    public jurisdiction_id: number;
    public denial_id: number;
    public violation: string;
    public localCounsel: string;
    public aorPHV: string;
    public opposingAttorney: string;
    public caseManager: string;
    public clientName: string;
    public defendantName: string;
    public defendantAbbreviation: string;
    public caseName: string;
    public caseNumber: string;
    public creator_id:number;
    public createdOn: Date;


    constructor(
        district_id:number,
        district_judge_id: number,
        magistrate_judge_id: number,
        venue_id: number,
        jurisdiction_id: number,
        denial_id: number,
        violation: string,
        localCounsel: string,
        aorPHV: string,
        opposingAttorney: string,
        caseManager: string,
        clientName: string,
        defendantName: string,
        defendantAbbreviation: string,
        caseName: string,
        caseNumber: string,
        creator_id:number,
        createdOn:Date
    ) {
        this.district_id = district_id;
        this.district_judge_id = district_judge_id;
        this.magistrate_judge_id = magistrate_judge_id;
        this.venue_id = venue_id;
        this.jurisdiction_id = jurisdiction_id;
        this.denial_id = denial_id;
        this.violation = violation;
        this.localCounsel = localCounsel;
        this.aorPHV = aorPHV;
        this.opposingAttorney = opposingAttorney;
        this.caseManager = caseManager;
        this.clientName = clientName;
        this.defendantName = defendantName;
        this.defendantAbbreviation = defendantAbbreviation;
        this.caseName = caseName;
        this.caseNumber = caseNumber;
        this.creator_id = creator_id;
        this.createdOn = createdOn;
    }


//    public get ccaseName() {
//         return this.caseName;
//     }












    

    // public  setDistrictJudgeName(districtJudgeName:string) {
    //     this.districtJudgeName = districtJudgeName;
    // }

    // public  setMagistrateJudgeName(magistrateJudgeName:string) {
    //     this.magistrateJudgeName = magistrateJudgeName;
    // }

    // public  setVenueType(venueType:string) {
    //     this.venueType = venueType;
    // }

    // public  setJurisdiction(jurisdiction: string) {
    //     this.jurisdiction = jurisdiction;
    // }

    // public  setDenialType(denialType : string) {
    //     this.denialType = denialType;
    // }

    // public  setViolation(violation : string) {
    //     this.violation = violation;
    // }

    // public  setLocalCounsel(localCounsel : string) {
    //     this.localCounsel = localCounsel;
    // }

    // public  setAorPHV(aorPHV:string) {
    //     this.aorPHV = aorPHV;
    // }

    // public  setOpposingAttorney(opposingAttorney: string) {
    //     this.opposingAttorney = opposingAttorney;
    // }

    // public  setCaseManager(caseManager:string) {
        
    //     this.caseManager = caseManager;
    // }

    // public  setClientName(clientName:string) {
    //     this.clientName = clientName;
    // }

    // public  setDefendantName(defendantName:string) {
    //     this.defendantName = defendantName;
    // }

    // public  setDefendantAbbreviation(defendantAbbreviation:string) {
    //     this.defendantAbbreviation = defendantAbbreviation;
    // }

    // public  setCaseName(caseName:string) {
    //     this.caseName = caseName;
    // }

    // public  setCaseNumber(caseNumber:string) {
    //     this.caseNumber = caseNumber;
    // }


    // public getCaseName(caseName: string) {
    //     return caseName;
    // }

    

}
