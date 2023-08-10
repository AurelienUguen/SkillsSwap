import { TestBed } from '@angular/core/testing';

import { MercureService } from './mercure.service';

describe('MercureService', () => {
  let service: MercureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
