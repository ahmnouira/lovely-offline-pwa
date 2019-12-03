import { TestBed } from '@angular/core/testing';

import { FirebaseAuthServiceService } from './firebase-auth-service.service';

describe('FirebaseAuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseAuthServiceService = TestBed.get(FirebaseAuthServiceService);
    expect(service).toBeTruthy();
  });
});
