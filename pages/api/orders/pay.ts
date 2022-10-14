import  axios, { AxiosError }  from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IPaipal } from '../../../interfaces';
import { Order } from '../../../models';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';


type Data = {
    message : string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
   
   
   switch (req.method) {
        case 'POST':

            return payOrder(req, res);
          
        default:
            res.status(200).json({ message  : 'Bad request' })

   }
   
}

const getPaypalBearertoken = async():Promise< string | null > =>{
     const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
     const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
     
     const base64Token = Buffer.from(`${ PAYPAL_CLIENT  }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');
     const body = new URLSearchParams('grant_type=client_credentials');



     try {
        const {data} =  await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers:{
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'Application/x-www-form-urlencoded'
            }
        })
        return data.access_token;

     } catch (error) {
        if ( axios.isAxiosError(error)){
            console.log(error.response?.data)
        }else{
            console.log(error)
            
        }
        return null
     }

  
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   




const paypalBearerToken = await getPaypalBearertoken();

if( !paypalBearerToken ) {
    return res.status(400).json({message : 'No se pudo confirmar el pago en paypal'})
}

const { transactionId = '' , orderId = '' } = req.body


if (!mongoose.isValidObjectId(orderId)){
    return res.status(400).json({message: 'no se encontro la orden'})
}

const { data } = await axios.get<IPaipal.PaypalOrderStatusResponse>(`${ process.env.PAYPAL_ORDERS_URL }/${transactionId}`,{
    headers:{
        'Authorization':`Bearer ${paypalBearerToken}`
    }
});
if ( data.status  !== 'COMPLETED'){
    return res.status(401).json({message : 'Orden no reconocida'});
}

await db.connect();
const dbOrder = await Order.findById(orderId)



if (!dbOrder){
    await db.disconnect()
    return res.status(401).json({message: 'No se encontró la orden'})
}

const session: any = await getSession({ req })



if(dbOrder.user!.toString() !== session.user._id){
    return res.status(400).json({message: 'Esta orden no pertenece al usuario'})
}

if (dbOrder.total !== Number(data.purchase_units[0].amount.value)){
   await db.disconnect()
   return res.status(401).json({message: 'Los totales de Paypal y de la orden no coinciden'}) 
}
dbOrder.transactionId = transactionId;
dbOrder.isPaid = true

await dbOrder.save() 

await db.disconnect()

    return res.status(200).json({message : 'Orden Pagada'})
}
