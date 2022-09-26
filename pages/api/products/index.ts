import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOPS_CONSTANTS } from '../../../database'
import { IProduct } from '../../../interfaces';
import {Product} from '../../../models';


type Data = 
| { message: string}
| IProduct[]

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method){
        case 'GET':
            return getProducts( req, res )
        default:
            return res.status(400).json({message: 'Endpoint no operativo'})  
    }

}

const getProducts = async (req:NextApiRequest, res:NextApiResponse<Data>) =>{
  
  const {gender = 'all' } = req.query;
 
  let condition = {}

  if (gender !== 'all' && SHOPS_CONSTANTS.validGenders.includes(`${gender}`)){
     condition = {gender}
  }

  await db.connect()
  
  const products = await Product.find(condition)
                                        .select('title images price inStock slug -_id')
                                        .lean()
                                        .sort({ price : 'ascending'})

  await db.disconnect()

  return res.status(200).json(products)
}