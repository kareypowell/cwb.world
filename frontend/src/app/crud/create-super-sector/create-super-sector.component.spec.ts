import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperSectorComponent } from './create-super-sector.component';

describe('CreateSuperSectorComponent', () => {
  let component: CreateSuperSectorComponent;
  let fixture: ComponentFixture<CreateSuperSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSuperSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuperSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
