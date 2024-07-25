import { TestBed } from '@angular/core/testing';

import { StorageFirebaseService } from './storage-firebase.service';

describe('StorageFirebaseService', () => {
  let service: StorageFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
