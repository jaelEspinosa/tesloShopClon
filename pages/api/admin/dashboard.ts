
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    numberOfClients: number;
    notPaidOrders: number;
    numberOfProducts: number;
    productsWithNoInvertory: number;
    lowInventory: number;

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    

    try {
        await db.connect()
      
        
    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInvertory,
        lowInventory,
    ] = await Promise.all([
            await Order.count(),              
            await Order.find({isPaid:true}).count(),
            await User.find({role:'client'}).count(),
            await Product.count(),
            await Product.find({inStock:0}).count(),
            await Product.find({ inStock: { $lte: 10 } }).count(),
    ]) 
        
        res.status(200).json({ 

            numberOfOrders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            productsWithNoInvertory,
            lowInventory,
            notPaidOrders: numberOfOrders - paidOrders,
    
        })
    } catch (error) {
        console.log(error)
    }
  
      await db.disconnect() 
    
    
}


