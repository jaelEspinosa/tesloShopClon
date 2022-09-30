import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';


interface contextProps{
    cart : ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    iva: number;
    total: number;

    //methods
    
    addProductToCart: (product: ICartProduct) => void;
    uptateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
}



export const CartContext = createContext({} as contextProps)