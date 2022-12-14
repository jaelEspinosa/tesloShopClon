import React, { FC, useReducer, useEffect, PropsWithChildren } from 'react';
import { useSession, signOut } from 'next-auth/react';

import axios from 'axios';


import Cookies from 'js-cookie';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

import { IUser } from '../../interfaces';
import { tesloApi } from '../../apiaxios';
import { useRouter } from 'next/router';



export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser
}


const AUTH_INITIAL_STATE : AuthState ={
    isLoggedIn : false,
    user: undefined
}



export const AuthProvider:FC<PropsWithChildren> = ({children}) => {
     const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
     const {data, status} = useSession()
     
     const router = useRouter()


    useEffect(()=>{
      if(status === 'authenticated'){
 
        
        dispatch({type: '[Auth] - Login', payload: data?.user as IUser})
      }

    },[data, status])  


    /*  useEffect (()=>{
     
     const token = Cookies.get('token')
     if(token){
       checkToken()
     } 

     },[]) */
      
     const checkToken = async ()=>{
      if(!Cookies.get('token')){
        return
      }

       try {
         const { data } = await tesloApi.get('/user/validate-token')
         const { user, token } = data
         Cookies.set('token', token)
         dispatch({type: '[Auth] - Login', payload: user})
       } catch ( error ) {
         console.log( error )
         Cookies.remove('token')
       }

     }

     const loginUser = async(email: string, password: string):Promise<boolean> =>{

        try {
           const { data } = await tesloApi.post('/user/login', {email, password});
           const { token, user } = data;
           Cookies.set('token',token)
           dispatch({type: '[Auth] - Login', payload: user})
           return true
        } catch (error) {
           return false
        } 
     }

    const registerUser = async (name: string, email: string, password: string):Promise<{hasError: boolean; message?:string}> =>{

      try {

        const { data } = await tesloApi.post('/user/register', {name, email, password});
        const {token, user} = data;
        Cookies.set('token', token)
        dispatch({type: '[Auth] - Login', payload: user})
        return {
          hasError: false
          
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
          const { message } = error.response?.data as {message : string}
          return {
            hasError: true,
            message
          }  
        }
       return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo'
       }
      } 
    }

    const logout = ()=>{
      Cookies.remove('cart');
      Cookies.remove('firstName');
      Cookies.remove('lastName');
      Cookies.remove('address');
      Cookies.remove('address2');
      Cookies.remove('zip');
      Cookies.remove('city');
      Cookies.remove('country');
      Cookies.remove('phone');
      signOut()
      /* Cookies.remove('token'); */
      /* if (router.asPath === '/'){
        router.reload()
      } */
      /* dispatch({type:'[Auth] - Logout'}) */
    }

   return (
    <AuthContext.Provider value={{
         ...state,
        

        //Methods
        loginUser,
        registerUser,
        logout,
      }}>
        {children}
      </AuthContext.Provider>
  )
}
