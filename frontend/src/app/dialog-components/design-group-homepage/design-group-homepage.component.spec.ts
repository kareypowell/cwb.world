import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignGroupHomepageComponent } from './design-group-homepage.component';

describe('DesignGroupHomepageComponent', () => {
  let component: DesignGroupHomepageComponent;
  let fixture: ComponentFixture<DesignGroupHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignGroupHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignGroupHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
