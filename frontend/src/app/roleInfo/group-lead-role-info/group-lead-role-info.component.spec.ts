import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLeadRoleInfoComponent } from './group-lead-role-info.component';

describe('GroupLeadRoleInfoComponent', () => {
  let component: GroupLeadRoleInfoComponent;
  let fixture: ComponentFixture<GroupLeadRoleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLeadRoleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLeadRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
