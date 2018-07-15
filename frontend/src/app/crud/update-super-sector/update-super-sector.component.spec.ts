import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuperSectorComponent } from './update-super-sector.component';

describe('UpdateSuperSectorComponent', () => {
  let component: UpdateSuperSectorComponent;
  let fixture: ComponentFixture<UpdateSuperSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSuperSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuperSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
