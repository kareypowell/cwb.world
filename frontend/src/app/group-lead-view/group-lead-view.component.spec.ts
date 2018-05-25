import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLeadViewComponent } from './group-lead-view.component';

describe('GroupLeadViewComponent', () => {
  let component: GroupLeadViewComponent;
  let fixture: ComponentFixture<GroupLeadViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLeadViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLeadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
