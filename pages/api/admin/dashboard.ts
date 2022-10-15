
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
        const orders =  await Order.find()
        const users = await User.find()
        const products = await Product.find()
        const paidOrders = orders.filter(order => order.isPaid === true )
    
        const numberOfClients = users.filter(user => user.role === 'client')
        const notPaidOrders = orders.filter(order => order.isPaid === false )
        
        const productsWithNoInvertory = products.filter(product => product.inStock === 0)
        const lowInventory = products.filter (product => product.inStock < 10)
        res.status(200).json({ 
            numberOfOrders: orders.length,
            paidOrders: paidOrders.length,
            numberOfClients:numberOfClients.length,
            notPaidOrders: notPaidOrders.length,
            numberOfProducts: products.length,
            productsWithNoInvertory: productsWithNoInvertory.length,
            lowInventory: lowInventory.length
    
        })
    } catch (error) {
        console.log(error)
    }
  
      await db.disconnect() 
    
    
}


