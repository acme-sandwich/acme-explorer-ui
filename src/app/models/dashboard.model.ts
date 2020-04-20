import { Entity } from "./entity.model";

class TripsPerManager {
    avgManagerTrips: number;
    maxManagerTrips: number;
    minManagerTrips: number;
    stdDevManagerTrips: number;

    constructor(){
    }
}

class ApplicationsPerTrip {
    avgTripApplication: number;
    maxTripApplication: number;
    minTripApplication: number;
    stdDevTripApplication: number;

    constructor(){
    }
}

class PricePerTrip {
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
    stdDevPrice: number;

    constructor(){
    }
}

class RatioApplicationsPerStatus {
    ratioPendingApplications: number;
    ratioRejectedApplications: number;
    ratioDueApplications: number;
    ratioAcceptedApplications: number;
    ratioCancelledApplications: number;

    constructor(){
    }
}

class AvgFinderPrices {
    avgMinPrice: number;
    avgMaxPrice: number;

    constructor(){
    }
}

class TopFinderKeywords {
    keyword: string;
    keywordSum: number;

    constructor(){
    }
}

export class Dashboard extends Entity{
    tripsPerManager: TripsPerManager;
    applicationsPerTrip: ApplicationsPerTrip;
    pricePerTrip: PricePerTrip;
    ratioApplicationsPerStatus: RatioApplicationsPerStatus;
    avgFinderPrices: AvgFinderPrices;
    topFinderKeyWords: TopFinderKeywords[];

    constructor() {
        super();
    }
}
