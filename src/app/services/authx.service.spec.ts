import { TestBed } from '@angular/core/testing';

import { AuthxService } from './authx.service';

describe('AuthxService', () => {
  let service: AuthxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
