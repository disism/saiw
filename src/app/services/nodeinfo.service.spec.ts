import { TestBed } from '@angular/core/testing';

import { NodeinfoService } from './nodeinfo.service';

describe('NodeinfoService', () => {
  let service: NodeinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
