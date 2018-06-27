import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorLeadCalendarComponent } from './sector-lead-calendar.component';

describe('SectorLeadCalendarComponent', () => {
  let component: SectorLeadCalendarComponent;
  let fixture: ComponentFixture<SectorLeadCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorLeadCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorLeadCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
