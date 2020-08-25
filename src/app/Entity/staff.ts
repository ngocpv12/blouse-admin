import { IUser } from './user';
import { IHospital } from './hospital';

export interface IStaff {
    id: number,
    hospital: IHospital,
    hospitalId: number,
    isActive: number,
    user: IUser
}