import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHostCalendarComponent } from './guest-host-calendar.component';

describe('GuestHostCalendarComponent', () => {
  let component: GuestHostCalendarComponent;
  let fixture: ComponentFixture<GuestHostCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestHostCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHostCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
