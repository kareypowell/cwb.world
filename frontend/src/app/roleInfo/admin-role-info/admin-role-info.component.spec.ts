import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleInfoComponent } from './admin-role-info.component';

describe('AdminRoleInfoComponent', () => {
  let component: AdminRoleInfoComponent;
  let fixture: ComponentFixture<AdminRoleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
