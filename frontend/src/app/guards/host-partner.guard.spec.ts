import { TestBed, async, inject } from '@angular/core/testing';

import { HostPartnerGuard } from './host-partner.guard';

describe('HostPartnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HostPartnerGuard]
    });
  });

  it('should ...', inject([HostPartnerGuard], (guard: HostPartnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
