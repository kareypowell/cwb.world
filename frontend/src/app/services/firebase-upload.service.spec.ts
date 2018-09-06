import { TestBed, inject } from '@angular/core/testing';

import { FirebaseUploadService } from './firebase-upload.service';

describe('FirebaseUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseUploadService]
    });
  });

  it('should be created', inject([FirebaseUploadService], (service: FirebaseUploadService) => {
    expect(service).toBeTruthy();
  }));
});
