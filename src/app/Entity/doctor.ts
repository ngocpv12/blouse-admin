import { IUser } from './user';
import { IDepartment } from './department';

export interface IDoctor {
    id: number,
    departmentId: number,
    isActive: number,
    user: IUser,
    department: IDepartment
  }