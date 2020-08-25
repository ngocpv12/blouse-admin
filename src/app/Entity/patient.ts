import { IUser } from './user';

export interface IPatient {
    id: number,
    isActive: number,
    user: IUser
  }