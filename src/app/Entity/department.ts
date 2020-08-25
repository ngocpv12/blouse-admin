import { IHospital } from './hospital';

export interface IDepartment {
    id: number,
    name: string,
    address: string,
    phoneNumber: string,
    website: string,
    email: string,
    description: string,
    hospital: IHospital,
    isActive: number
  }