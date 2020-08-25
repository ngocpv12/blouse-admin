import { IMedicalExamination } from './medical-examination';

export interface IMedicalRecord{
    id: number,
    description: string,
    pathology: string,
    treatment: string,
    isActive: number,
    medicalExamination: IMedicalExamination
}