import { IPatient } from './patient';
import { IDoctor } from './doctor';
import { IAppointment } from './appointment';
import { IMedicalReport } from './medical-report';
import { IPayment } from './payment';

export interface IMedicalExamination{
    id: number,
    patient: IPatient,
    doctor: IDoctor,
    status: number,
    appointment: IAppointment,
    payment: IPayment,
    isActive: number
}