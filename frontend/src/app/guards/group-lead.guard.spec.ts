import { TestBed, async, inject } from '@angular/core/testing';

import { GroupLeadGuard } from './group-lead.guard';

describe('GroupLeadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupLeadGuard]
    });
  });

  it('should ...', inject([GroupLeadGuard], (guard: GroupLeadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
