import { TestBed } from '@angular/core/testing';

import { TravelgroupsService } from './travelgroups.service';

describe('TravelgroupsService', () => {
  let service: TravelgroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelgroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
