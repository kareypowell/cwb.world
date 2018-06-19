import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToJoinGroupComponent } from './request-to-join-group.component';

describe('RequestToJoinGroupComponent', () => {
  let component: RequestToJoinGroupComponent;
  let fixture: ComponentFixture<RequestToJoinGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestToJoinGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToJoinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
