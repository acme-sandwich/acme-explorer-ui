import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditsEditComponent } from './audits-edit.component';

describe('AuditsEditComponent', () => {
  let component: AuditsEditComponent;
  let fixture: ComponentFixture<AuditsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
