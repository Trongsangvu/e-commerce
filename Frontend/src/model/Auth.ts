export enum roles {
    Admin = 'Admin',
    User = 'User'
}

// Unified user for both login and register responses
export interface AuthUser {
    name?: string;
    email: string;
    password?: string;
    role?: roles;
    token?: string;
}

// Login request payload
export interface ILogin {
    email: string;
    password: string;   
}

// Login API response 
export interface ILoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: roles;
    }
}

// Response request payload
export interface IRegister {
    name: string;
    email: string;
    password: string;
}

// Register API response
export interface IRegisterResponse {
    user: {
        id: string;
        email: string;
    }
}