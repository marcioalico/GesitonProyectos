import { TestBed } from '@angular/core/testing';

import { ClokingService } from './cloking.service';

describe('ClokingService', () => {
  let service: ClokingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClokingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
