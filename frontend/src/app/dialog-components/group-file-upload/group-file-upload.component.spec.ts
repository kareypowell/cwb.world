import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFileUploadComponent } from './group-file-upload.component';

describe('GroupFileUploadComponent', () => {
  let component: GroupFileUploadComponent;
  let fixture: ComponentFixture<GroupFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
