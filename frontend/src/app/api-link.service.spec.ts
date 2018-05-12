import { TestBed, inject } from '@angular/core/testing';

import { ApiLinkService } from './api-link.service';

describe('ApiLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiLinkService]
    });
  });

  it('should be created', inject([ApiLinkService], (service: ApiLinkService) => {
    expect(service).toBeTruthy();
  }));
});
