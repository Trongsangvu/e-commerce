export enum roles {
    Admin = 'Admin',
    User = 'User'
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: roles;
}

export interface ILogin {
    email: string;
    password: string;   
}

export interface ILoginResponse {
    token: string;
}