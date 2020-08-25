import { IPatient } from './patient';

export interface IMedicalReport{
    id: number,
    patient: IPatient,
    description: string,
    isActive: number
}