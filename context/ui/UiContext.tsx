import { createContext } from 'react';


interface contextProps{
    isMenuOpen: boolean;
    
    // methods
    toggleSideMenu: () => void;
}



export const UiContext = createContext({} as contextProps)