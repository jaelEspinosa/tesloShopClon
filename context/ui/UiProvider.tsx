
import React, { FC, useReducer } from 'react';
import { UiContext } from './UiContext';
import { uiReducer } from './uiReducer';
import { PropsWithChildren } from 'react';

export interface UiState {
   isMenuOpen: boolean;
}


const UI_INITIAL_STATE : UiState ={
    isMenuOpen : false,
}



export const UiProvider:FC<PropsWithChildren> = ({children}) => {
     const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

     const toggleSideMenu = ()=>{
        dispatch({type: '[UI] - ToggleMenu'})
     }


   return (
    <UiContext.Provider value={{
         ...state,
         

         // methods

         toggleSideMenu,
      }}>
        {children}
      </UiContext.Provider>
  )
}
