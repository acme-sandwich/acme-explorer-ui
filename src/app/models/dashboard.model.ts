import { Entity } from "./entity.model";

export class TripsPerManager {
    avgManagerTrips: number;
    maxManagerTrips: number;
    minManagerTrips: number;
    stdDevManagerTrips: number;

    constructor(){
        this.avgManagerTrips = 0;
        this.maxManagerTrips = 0;
        this.minManagerTrips = 0;
        this.stdDevManagerTrips = 0;
    }
}

export class ApplicationsPerTrip {
    avgTripApplication: number;
    maxTripApplication: number;
    minTripApplication: number;
    stdDevTripApplication: number;

    constructor(){
        this.avgTripApplication = 0;
        this.maxTripApplication = 0;
        this.minTripApplication = 0;
        this.stdDevTripApplication = 0;
    }
}

export class PricePerTrip {
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
    stdDevPrice: number;

    constructor(){
        this.avgPrice = 0;
        this.minPrice = 0;
        this.maxPrice = 0;
        this.stdDevPrice = 0;
    }
}

export class RatioApplicationsPerStatus {
    ratioPendingApplications: number;
    ratioRejectedApplications: number;
    ratioDueApplications: number;
    ratioAcceptedApplications: number;
    ratioCancelledApplications: number;

    constructor(){
        this.ratioPendingApplications = 0;
        this.ratioRejectedApplications = 0;
        this.ratioDueApplications = 0;
        this.ratioAcceptedApplications = 0;
        this.ratioCancelledApplications = 0;
    }
}

export class AvgFinderPrices {
    avgMinPrice: number;
    avgMaxPrice: number;

    constructor(){
        this.avgMinPrice = 0;
        this.avgMaxPrice = 0;
    }
}

export class TopFinderKeywords {
    keyword: string;
    keywordSum: number;

    constructor(){
        this.keyword = "(empty)";
        this.keywordSum = 0;
    }
}

export class Dashboard extends Entity{
    tripsPerManagers: TripsPerManager;
    applicationsPerTrip: ApplicationsPerTrip;
    pricePerTrip: PricePerTrip;
    ratioApplicationsPerStatus: RatioApplicationsPerStatus;
    avgFinderPrices: AvgFinderPrices;
    topFinderKeyWords: TopFinderKeywords[];

    constructor() {
        super();
    }
}
