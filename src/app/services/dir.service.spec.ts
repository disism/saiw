import { TestBed } from '@angular/core/testing';

import { DirService } from './dir.service';

describe('DirService', () => {
  let service: DirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
