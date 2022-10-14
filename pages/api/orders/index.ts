

import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product } from '../../../models';
import Order from '../../../models/Order';

type Data = 
|{message: string}
|IOrder

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch ( req.method ){
 
        case 'POST':
          return createOrder (req, res);
            
        default:
            return res.status(400).json({message: 'opcion no permitida'})

    }
  
  
 
    
  }
  const createOrder = async (req: NextApiRequest, res:NextApiResponse)=>{
    const { orderItems, total } = req.body as IOrder;

    

    
    // verificar que tenemos un  usuario

    const session: any = await getSession({ req })

    if(!session){
       return res.status(401).json({message:'Primero debe iniciar sesión'})
    }

  // Crear un arreglo con los productos que la persona quiere
    const productsIds = orderItems.map( product => product._id)
    
    await db.connect()

    const dbProducts = await Product.find({_id: {$in: productsIds}})
    
    

    try {
      

      const subTotal = orderItems.reduce( (prev, current) => {
        const currentPrice = dbProducts.find (prod => prod.id === current._id)?.price
          if(!currentPrice){
          throw new Error('Verifique el carrito, El producto no existe')
      }

          return  (currentPrice*current.quantity) + prev
      
      }, 0) 


    if(total !== subTotal){
       throw new Error ('Se produjo un error al generar la orden: El total no coincide')
    }
    
    //Todo bien hasta este punto

    const userId = session.user._id;
    const newOrder = new Order({...req.body, isPaid: false, user: userId })
    newOrder.total = Math.round (newOrder.total * 100 ) / 100; // redondeamos el total a dos decimales

    await newOrder.save()
    await db.disconnect()
    
    return res.status(201).json( newOrder )
    
      
    } catch (error: any) {
      await db.disconnect()
      console.log(error); 
      res.status(400).json({
        message:error.message || 'Revise logs del servidor'
      })     
    }
    
}