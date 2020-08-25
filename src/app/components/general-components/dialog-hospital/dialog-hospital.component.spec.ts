import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHospitalComponent } from './dialog-hospital.component';

describe('DialogHospitalComponent', () => {
  let component: DialogHospitalComponent;
  let fixture: ComponentFixture<DialogHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
