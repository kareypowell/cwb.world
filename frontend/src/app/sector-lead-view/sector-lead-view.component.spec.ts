import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorLeadViewComponent } from './sector-lead-view.component';

describe('SectorLeadViewComponent', () => {
  let component: SectorLeadViewComponent;
  let fixture: ComponentFixture<SectorLeadViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorLeadViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorLeadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
