import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMedicalExaminationComponent } from './dialog-medical-examination.component';

describe('DialogMedicalExaminationComponent', () => {
  let component: DialogMedicalExaminationComponent;
  let fixture: ComponentFixture<DialogMedicalExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMedicalExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMedicalExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
