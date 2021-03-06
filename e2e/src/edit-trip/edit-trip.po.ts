import {browser, by, element} from 'protractor';

export class EditTripPage {

    emptyDescription() {
        const selector = '#description';
        element(by.css(selector)).clear();
    }
    setDescription(newDescription: string) {
        const selector = '#description';
        element(by.css(selector)).sendKeys(newDescription);
    }

    clickNewRequirement() {
        const selector = '#service-login > div > div > div > div > form > fieldset > div:nth-child(12) > button';
        element(by.css(selector)).click();
    }

    removeRequirement() {
        const selector = 'remove_requirement_button_1';
        element(by.id(selector)).click();
    }

    addNewRequirement(newRequirement: string) {
        const selector = 'requirement_input_1';
        element(by.id(selector)).sendKeys(newRequirement);
    }

    saveTrip() {
        const selector = '#service-login > div > div > div > div > form > fieldset > button.btn.btn-primary';
        element(by.css(selector)).click();
    }

}