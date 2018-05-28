import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorLeadRoleInfoComponent } from './sector-lead-role-info.component';

describe('SectorLeadRoleInfoComponent', () => {
  let component: SectorLeadRoleInfoComponent;
  let fixture: ComponentFixture<SectorLeadRoleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorLeadRoleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorLeadRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
