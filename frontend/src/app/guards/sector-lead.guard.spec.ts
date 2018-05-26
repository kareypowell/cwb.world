import { TestBed, async, inject } from '@angular/core/testing';

import { SectorLeadGuard } from './sector-lead.guard';

describe('SectorLeadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectorLeadGuard]
    });
  });

  it('should ...', inject([SectorLeadGuard], (guard: SectorLeadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
