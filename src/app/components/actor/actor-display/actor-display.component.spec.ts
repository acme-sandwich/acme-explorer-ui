import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDisplayComponent } from './actor-display.component';

describe('ActorDisplayComponent', () => {
  let component: ActorDisplayComponent;
  let fixture: ComponentFixture<ActorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
