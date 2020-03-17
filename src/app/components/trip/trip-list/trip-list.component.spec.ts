import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import { TripService } from 'src/app/services/trip.service';

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 trips n the collection', () => {
    expect(component.getTrips().length).toEqual(3);
  });

  it('should retrieve second trip since it is the only one flagged as cancelled', () => {
    expect(component.getTrips().filter(trip => trip.cancelled = true)).toContain(component.getTrips()[2]);
  });

  it('should remove a trip', () => {
    expect(component.getTrips()[1].cancelled).toBeFalsy();
    component.cancellTrip(1);
    expect(component.getTrips()[1].cancelled).toBeTruthy();
  });

  it('should display a table with 3 rows', () => {
    const compiled = fixture.debugElement.nativeElement;
    const elements = compiled.querySelector('table').getElementsByTagName('tr');
    expect(elements.length).toBe(3);
  });

  it('should have the same trips than the ones created in the service', () => {
    const tripService = fixture.debugElement.injector.get(TripService);
    const componentTrips = component.getTrips();
    const serviceTrips = tripService.createTrips();
    expect(componentTrips.length).toBe(serviceTrips.length);
    for(let i = 0; i < componentTrips.length; i++){
      expect(componentTrips[i].ticker).toBe(serviceTrips[i].ticker);
    }
  });

});
