import {browser, by, element} from 'protractor';

export class TripsPage {
    navigateTo() {
        return browser.get('/trips');
    }

    navigateToTrip(tripId: string) {
        return browser.get('/trips/display/'+tripId);
    }

    getTitleText() {
        const selector = '#blog > div > div.row > div > article > h2 > a';
        return element(by.css(selector)).getText();
    }

    displayTrip() {
        const selector = '#blog > div > div.row > div > article > h2 > a';
        element(by.css(selector)).click();
    }

    editTrip() {
        const selector = '#blog > div > div.col-lg-4 > div > div > ul > li:nth-child(3) > a';
        element(by.css(selector)).click();
    }

}