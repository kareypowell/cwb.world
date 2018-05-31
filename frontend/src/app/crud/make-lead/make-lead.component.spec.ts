import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeLeadComponent } from './make-lead.component';

describe('MakeLeadComponent', () => {
  let component: MakeLeadComponent;
  let fixture: ComponentFixture<MakeLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
