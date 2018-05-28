import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPartnerRoleInfoComponent } from './host-partner-role-info.component';

describe('HostPartnerRoleInfoComponent', () => {
  let component: HostPartnerRoleInfoComponent;
  let fixture: ComponentFixture<HostPartnerRoleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostPartnerRoleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPartnerRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
