import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderEditComponent } from './finder-edit.component';

describe('FinderEditComponent', () => {
  let component: FinderEditComponent;
  let fixture: ComponentFixture<FinderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
