import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAddPhotoComponent } from './trip-add-photo.component';

describe('TripAddPhotoComponent', () => {
  let component: TripAddPhotoComponent;
  let fixture: ComponentFixture<TripAddPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripAddPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripAddPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
