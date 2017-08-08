import { TestBed, inject } from '@angular/core/testing';

import { CommDataService } from './comm-data.service';

describe('CommDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommDataService]
    });
  });

  it('should be created', inject([CommDataService], (service: CommDataService) => {
    expect(service).toBeTruthy();
  }));
});
