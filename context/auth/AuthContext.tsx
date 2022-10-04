import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface contextProps{
    isLoggedIn : boolean;
    user?: IUser;
    registerUser: (name: string, email: string, password: string) => Promise<{
        hasError: boolean;
        message?: string;}>

    // methods

    loginUser: (email: string, password: string) => Promise<boolean>
    
}



export const AuthContext = createContext({} as contextProps)