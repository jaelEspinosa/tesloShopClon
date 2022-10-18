import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";

import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from '../../../interfaces';

type Data = 
|{message: string}
|IProduct[]
|IProduct

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);
    case "POST":
      return createProducts(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
  await db.connect()

  const products = await Product.find().sort ({title:'asc'}).lean()

  await db.disconnect()

  //TODO hay que actualizar las imagenes

  res.status(200).json(products)
}



const updateProduct = async  (req: NextApiRequest, res: NextApiResponse<Data>) => {
  
   const {_id = '', images = []}  = req.body as IProduct;

   if (!isValidObjectId(_id)) {
    return res.status(400).json({message:'El id del producto no es válido'})
   }

   if (images.length < 2){
    return res.status(400).json({message:'Se necesitan al menos dos imagenes'})
   }

 //TODO: posiblemente tendremos un lacalhost:3000/products/asdasd.jpg

 try {
  await db.connect()
  const product = await Product.findById(_id)
  if(!product){
    return res.status(400).json({message:'Producto no encontrado'})
  }
// TODO: Eliminar fotos de Cloudinary

  await product.update( req.body )
 
  await db.disconnect()

  return res.status(200).json( product );

} catch (error) {
  console.log(error)
  await db.disconnect()
  return res.status(400).json({message:'Error en el servidor'})

 }
  
}




const createProducts = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  throw new Error("Function not implemented.");
};
