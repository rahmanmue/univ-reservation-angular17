import { TestBed } from '@angular/core/testing';

import { TypeFacilitiesService } from './type-facilities.service';

describe('TypeFacilitiesService', () => {
  let service: TypeFacilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeFacilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
