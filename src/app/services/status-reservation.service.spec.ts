import { TestBed } from '@angular/core/testing';

import { StatusReservationService } from './status-reservation.service';

describe('StatusReservationService', () => {
  let service: StatusReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
