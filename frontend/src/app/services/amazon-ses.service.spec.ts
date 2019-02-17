import { TestBed, inject } from '@angular/core/testing';

import { AmazonSesService } from './amazon-ses.service';

describe('AmazonSesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmazonSesService]
    });
  });

  it('should be created', inject([AmazonSesService], (service: AmazonSesService) => {
    expect(service).toBeTruthy();
  }));
});
