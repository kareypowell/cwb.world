import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUiComponent } from './member-ui.component';

describe('MemberUiComponent', () => {
  let component: MemberUiComponent;
  let fixture: ComponentFixture<MemberUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
