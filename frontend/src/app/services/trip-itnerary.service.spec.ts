import { TestBed } from '@angular/core/testing';

import { TripItneraryService } from './trip-itnerary.service';

describe('TripItneraryService', () => {
  let service: TripItneraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripItneraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
