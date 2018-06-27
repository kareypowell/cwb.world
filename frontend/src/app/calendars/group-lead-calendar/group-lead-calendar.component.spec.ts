import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLeadCalendarComponent } from './group-lead-calendar.component';

describe('GroupLeadCalendarComponent', () => {
  let component: GroupLeadCalendarComponent;
  let fixture: ComponentFixture<GroupLeadCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLeadCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLeadCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
