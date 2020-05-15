import {browser, by, element} from 'protractor';

export class LoginPage {
    private credentials = {
        username: 'manager1@mail.com',
        password: 'manager1'
    };

    navigateTo() {
        return browser.get('/login');
    }

    fillCredentials(credentials: any = this.credentials) {
        const buttonSelector = '#service-login > div > div.row.justify-content-center.align-items-center > div > div > form > div:nth-child(4) > div > button';
        element(by.id('email')).sendKeys(credentials.username);
        element(by.id('pwd')).sendKeys(credentials.password);
        element(by.css(buttonSelector)).click();
    }
}