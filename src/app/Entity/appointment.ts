import { IPatient } from './patient';
import { IDoctor } from './doctor';
import { IStaff } from './staff';

export interface IAppointment {
    id: number,
    appointmentTime: string,
    place: string,
    status: number,
    isActive: number,
    patient: IPatient,
    doctor: IDoctor,
    staff: IStaff
}