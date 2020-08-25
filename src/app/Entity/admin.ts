import { IUser } from './user';

export interface IAdmin{
    id: number,
    user: IUser,
    isActive: number
}