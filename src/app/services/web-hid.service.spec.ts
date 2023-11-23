import { TestBed } from '@angular/core/testing';

import { WebHidService } from './web-hid.service';

describe('WebHidService', () => {
  let service: WebHidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebHidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
