import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRegistrationDetailsComponent } from './complete-registration-details.component';

describe('CompleteRegistrationDetailsComponent', () => {
  let component: CompleteRegistrationDetailsComponent;
  let fixture: ComponentFixture<CompleteRegistrationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteRegistrationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
