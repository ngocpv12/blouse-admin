import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMedicalRecordComponent } from './dialog-medical-record.component';

describe('DialogMedicalRecordComponent', () => {
  let component: DialogMedicalRecordComponent;
  let fixture: ComponentFixture<DialogMedicalRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMedicalRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
