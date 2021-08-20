import { TestBed } from '@angular/core/testing';

import { NgxFittextService } from './ngx-fittext.service';

describe('NgxFittextService', () => {
  let service: NgxFittextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFittextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
