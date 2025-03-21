export enum roles {
    Admin = 'Admin',
    User = 'User'
}

export interface IUser {
    name: string;
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
    user: {
        id: string;
        email: string;
        role: roles;
    }
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
}

export interface IRegisterResponse {
    user: {
        id: string;
        email: string;
    }
}