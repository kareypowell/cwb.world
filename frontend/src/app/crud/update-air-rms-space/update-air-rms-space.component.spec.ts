import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAirRmsSpaceComponent } from './update-air-rms-space.component';

describe('UpdateAirRmsSpaceComponent', () => {
  let component: UpdateAirRmsSpaceComponent;
  let fixture: ComponentFixture<UpdateAirRmsSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAirRmsSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAirRmsSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
