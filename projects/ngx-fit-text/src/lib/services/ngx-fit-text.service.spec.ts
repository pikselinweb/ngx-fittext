import { TestBed } from '@angular/core/testing';

import { NgxFitTextService } from './ngx-fit-text.service';

describe('NgxFitTextService', () => {
  let service: NgxFitTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFitTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
