import { TestBed } from '@angular/core/testing';

import { MedicalExaminationService } from './medical-examination.service';

describe('MedicalExaminationService', () => {
  let service: MedicalExaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalExaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
