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
        const selector = 'edit-trip-link';
        element(by.id(selector)).click();
    }

}