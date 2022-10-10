import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';



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

    // Orders
    createOrder: () => Promise<void>;
}



export const CartContext = createContext({} as contextProps)