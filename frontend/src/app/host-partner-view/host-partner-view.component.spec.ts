import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPartnerViewComponent } from './host-partner-view.component';

describe('HostPartnerViewComponent', () => {
  let component: HostPartnerViewComponent;
  let fixture: ComponentFixture<HostPartnerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostPartnerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPartnerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
