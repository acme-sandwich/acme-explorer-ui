import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderListComponent } from './finder-list.component';

describe('FinderListComponent', () => {
  let component: FinderListComponent;
  let fixture: ComponentFixture<FinderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
