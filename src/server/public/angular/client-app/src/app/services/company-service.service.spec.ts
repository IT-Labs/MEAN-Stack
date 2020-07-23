/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyServiceService } from './company-service.service';

describe('Service: CompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyServiceService]
    });
  });

  it('should ...', inject([CompanyServiceService], (service: CompanyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
