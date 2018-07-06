import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAirRmsSpaceComponent } from './create-air-rms-space.component';

describe('CreateAirRmsSpaceComponent', () => {
  let component: CreateAirRmsSpaceComponent;
  let fixture: ComponentFixture<CreateAirRmsSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAirRmsSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAirRmsSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
