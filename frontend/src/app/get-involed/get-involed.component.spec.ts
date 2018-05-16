import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInvoledComponent } from './get-involed.component';

describe('GetInvoledComponent', () => {
  let component: GetInvoledComponent;
  let fixture: ComponentFixture<GetInvoledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInvoledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInvoledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
