import { IMedicalExamination } from './medical-examination';
import { IPatient } from './patient';

export interface IPayment{
    id: number,
    patient: IPatient,
    amount: number,
    status: number,
    isActive: number,
    createdAt: Date,
    modifiedAt: Date,
    medicalExamination: IMedicalExamination
}