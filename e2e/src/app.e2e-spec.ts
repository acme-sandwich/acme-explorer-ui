import { AppPage } from './app.po';
import { LoginPage } from './login/login.po';
import { TripsPage } from './trips/trips.po';
import { browser } from 'protractor';
import { EditTripPage } from './edit-trip/edit-trip.po';

describe('workspace-project App', () => {
  let login: LoginPage;
  let page: TripsPage;
  let editTrip: EditTripPage;
  let originalTimeout;

  beforeEach(() => {
    login = new LoginPage();
    page = new TripsPage();
    editTrip = new EditTripPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should edit a trip', () => {
    login.navigateTo();
    browser.sleep(2000);
    login.fillCredentials();
    browser.sleep(2000);
    page.navigateTo();
    browser.sleep(3000);
    expect(page.getTitleText()).toEqual('Vive La Antártida');
    page.navigateToTrip('5ebeb4f16ca50c0019fc6506');
    browser.sleep(6000);
    page.editTrip();
    browser.sleep(2000);
    editTrip.emptyDescription();
    browser.sleep(2000);
    editTrip.setDescription('Esta es la nueva descripción del trip, cambiada gracias a protractor');
    browser.sleep(2000);
    editTrip.removeRequirement();
    browser.sleep(2000);
    editTrip.clickNewRequirement();
    browser.sleep(2000);
    editTrip.addNewRequirement('Nuevo requisito para el trip gracias a Protractor');
    browser.sleep(2000);
    editTrip.saveTrip();
    browser.sleep(5000);
  });
});
