
import React, { FC, useEffect, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { PropsWithChildren } from 'react';
import { ICartProduct } from '../../interfaces';

import Cookie from 'js-cookie'


export interface CartState {
   cart: ICartProduct[];
}


const CART_INITIAL_STATE : CartState ={
    cart: []
}



export const CartProvider:FC<PropsWithChildren> = ({children}) => {
     const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)


    useEffect(() => {

      try {
        const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : []
        dispatch({type:'[Cart] - LoadCart from cookies | storage', payload: cookieProducts})
      } catch (error) {
        dispatch({type:'[Cart] - LoadCart from cookies | storage', payload: []})
      }
            
    }, [])
    


     useEffect(() => {
      if(state.cart.length === 0){return;}
      Cookie.set('cart', JSON.stringify(state.cart))
     }, [state.cart])


     const addProductToCart  = (product: ICartProduct) =>{     
      
       const productInCart = state.cart.some(p => p._id === product._id) 
       if (!productInCart) return dispatch({type: '[Cart] - Update products in cart', payload: [...state.cart, product] }) 
      
       // si pasa esta condicion es que HAY un  producto con el mismo id
       
       const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
       if(!productInCartButDifferentSize) return dispatch ({type: '[Cart] - Update products in cart', payload: [...state.cart, product] }) 
    
       // si pasa esta condición es que ademas HAY un producto con la misma id y talla

       // acumular mapeamos el state para actualizar cantidad y no repetir el producto

       const updatedProducts = state.cart.map (p=> {
        if (p._id !== product._id) return p;
        if (p.size !== product.size) return p;

      // actualizar cantidad
        p.quantity += product.quantity
        return p
       })
       return dispatch ({type: '[Cart] - Update products in cart', payload : updatedProducts})

      }
     
  const uptateCartQuantity = (product: ICartProduct)=>{
     dispatch({type: '[Cart] - Change cart quantity', payload: product });
  }

   return (
   

 
    <CartContext.Provider value={{
         ...state,

         // methods

         addProductToCart,
         uptateCartQuantity
      }}>
        {children}
      </CartContext.Provider>
  )
}
