import { TestBed, inject } from '@angular/core/testing';

import { NgxPictureFramingService } from './ngx-picture-framing.service';

describe('NgxPictureFramingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxPictureFramingService]
    });
  });

  it('should be created', inject([NgxPictureFramingService], (service: NgxPictureFramingService) => {
    expect(service).toBeTruthy();
  }));
});
