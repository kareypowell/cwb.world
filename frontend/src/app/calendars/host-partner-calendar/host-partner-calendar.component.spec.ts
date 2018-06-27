import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPartnerCalendarComponent } from './host-partner-calendar.component';

describe('HostPartnerCalendarComponent', () => {
  let component: HostPartnerCalendarComponent;
  let fixture: ComponentFixture<HostPartnerCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostPartnerCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPartnerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
