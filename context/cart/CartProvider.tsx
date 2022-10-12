
import React, { FC, useEffect, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { PropsWithChildren } from 'react';
import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';

import Cookie from 'js-cookie'
import tesloApi from '../../api/tesloApi';
import axios from 'axios';








export interface CartState {
   isLoaded: boolean;
   cart: ICartProduct[];
   numberOfItems: number; 
   subTotal: number;
   iva: number;
   total: number;
   shippingAddress?: ShippingAddress;
}





const CART_INITIAL_STATE : CartState ={
    isLoaded:false,
    cart: [],
    numberOfItems: 0, 
    subTotal: 0,
    iva: 0,
    total: 0,
    shippingAddress: undefined
    
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
      
     

     },[state.cart])

     useEffect(()=>{
      if (Cookie.get('firstName')){

        const shippingAddress ={
         firstName :   Cookie.get('firstName') || '',
         lastName  :   Cookie.get('lastName') || '',
         address   :   Cookie.get('address') || '',
         address2  :   Cookie.get('address2') || '',
         zip       :   Cookie.get('zip') || '',
         city      :   Cookie.get('city') || '',
         country   :   Cookie.get('country') || '',
         phone     :   Cookie.get('phone') || ''
        }
   
         dispatch({type:'[Cart] - LoadAddress From cookies', payload: shippingAddress })
      }


     },[])
     
     const UpdateAddress = (address : ShippingAddress) =>{
      Cookie.set( 'firstName',address.firstName)
      Cookie.set( 'lastName',address.lastName)
      Cookie.set( 'address',address.address)
      Cookie.set( 'address2',address.address2 || '')
      Cookie.set( 'zip',address.zip)
      Cookie.set( 'city',address.city)
      Cookie.set( 'country',address.country)
      Cookie.set( 'phone',address.phone)
  
        dispatch({type:'[Cart] - Update Address', payload: address })

     }
     
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
 
  const createOrder = async ():Promise<{hasError: boolean; message: string}>=>{

      if(!state.shippingAddress){
       throw new Error('No hay dirección de entrega')
      }

    const body: IOrder = {
      orderItems: state.cart.map(p => ({
        ...p,
        size: p.size!
      })), 
      shippingAddress: state.shippingAddress,  
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      iva: state.iva,
      total: state.total,
      isPaid: false
    }  

   
    try {
      
      const{ data } = await tesloApi.post('/orders', body)
      Cookie.remove('cart')
      dispatch({type: '[Cart] - Order complete'})

      

      return {
        hasError: false,
        message: data._id
      }

    } catch (error) {

      console.log(error);

     if (axios.isAxiosError(error)){
      const { message } = error.response?.data as { message : string}
      return{
        hasError: true,
        message
      }
      
     }
      return {
        hasError: true,
        message: 'Error en el servidor, intente de nuevo'
      }
      
    }


  }

   return (
   

    <CartContext.Provider value={{
         ...state,

         // methods

         addProductToCart,
         removeCartProduct,
         uptateCartQuantity,
         UpdateAddress,
         createOrder,
      }}>
        {children}
      </CartContext.Provider>
  )
}
