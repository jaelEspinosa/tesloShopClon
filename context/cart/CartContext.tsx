import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './';


interface contextProps{
    isLoaded        : boolean;
    cart            : ICartProduct[];
    numberOfItems   : number;
    subTotal        : number;
    iva             : number;
    total           : number;
      
    shippingAddress?:ShippingAddress

    //methods
    UpdateAddress: (address: ShippingAddress) => void
    addProductToCart: (product: ICartProduct) => void;
    uptateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
}



export const CartContext = createContext({} as contextProps)