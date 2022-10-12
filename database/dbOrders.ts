import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IOrder } from "../interfaces";
import Order from "../models/Order";



export const getOrderById = async( id: string ):Promise<IOrder | null> =>{
   
    
if (!isValidObjectId(id)){        
    return null
}

await db.connect()
const order = await Order.findById( id ).lean()
await db.disconnect()

if(!order){
    return null
}

return JSON.parse(JSON.stringify( order ))

}

// TODO esto lo hago por mi cuenta, comprobar según el curso

export const getOrders = async (id:string):Promise<IOrder[] | null > =>{

    await db.connect()
    const orders = await Order.find({user : id}).lean()
    await db.disconnect()

if(!orders){
    return null
}
return JSON.parse(JSON.stringify( orders ))
}