
import React, { FC, useEffect, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { PropsWithChildren } from 'react';
import { ICartProduct } from '../../interfaces';

import Cookie from 'js-cookie'
import { stat } from 'fs/promises';
import { CurrencyYenTwoTone } from '@mui/icons-material';



export interface CartState {
   cart: ICartProduct[];
   numberOfItems: number; 
   subTotal: number;
   iva: number;
   total: number;
}


const CART_INITIAL_STATE : CartState ={
    cart: [],
    numberOfItems: 0, 
    subTotal: 0,
    iva: 0,
    total: 0,
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



     useEffect(()=>{
      const numberOfItems =  state.cart.reduce( (prev, current) => current.quantity + prev, 0)
      const subTotal = state.cart.reduce( (prev, current) => (current.price*current.quantity) + prev, 0)
     
      const orderSummary = {
      numberOfItems,
      subTotal: subTotal-((subTotal/100)*21),
      iva: Number((subTotal*0.21).toFixed(2)),
      total : subTotal
     }
     dispatch({type:'[Cart] - Update order summary', payload: orderSummary})
      
     console.log(orderSummary)

     },[state.cart])


     
     
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

  const removeCartProduct = (product: ICartProduct)=>{
     const updatedCartProducts = state.cart.filter(p =>!(p._id === product._id && p.size === product.size))
    
    //! esto seria igual pero con mas lineas

    /* const updatedCartProducts = state.cart.filter(p=>{
       if (p._id !== product._id) return p
       if (p.size !== product.size) return p  
    
    }) */
    
    return dispatch ({type: '[Cart] - Remove product in cart', payload: updatedCartProducts})
  }
 

   return (
   

    <CartContext.Provider value={{
         ...state,

         // methods

         addProductToCart,
         removeCartProduct,
         uptateCartQuantity,
      }}>
        {children}
      </CartContext.Provider>
  )
}