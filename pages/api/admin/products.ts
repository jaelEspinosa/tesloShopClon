import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import {v2 as cloudinary} from 'cloudinary'

import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct[] | IProduct;

cloudinary.config( process.env.CLOUDINARY_URL || '')

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
      return createProduct(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Product.find().sort({ title: "asc" }).lean();

  await db.disconnect();

  const updatedProducts = products.map( product =>{
    product.images = product.images.map( image => {
      return image.includes('http') ? image : `${process.env.HOST_NAME}products/${ image }`
  });
     return product
 })

  res.status(200).json(updatedProducts);
};

const updateProduct = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El id del producto no es válido" });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Se necesitan al menos dos imagenes" });
  }

  //TODO: posiblemente tendremos un lacalhost:3000/products/asdasd.jpg

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }

      product.images.forEach( async(image) => {
        if (!images.includes(image) ){
          //borrar de cloudinary
          const [ fileId, extension ] = image.substring(image.lastIndexOf('/') +1 ).split('.')
          console.log({image, fileId, extension })
          await cloudinary.uploader.destroy(fileId)
        }

      })


    await product.update(req.body);

    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Error en el servidor" });
  }
};

const createProduct = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: "El producto necesita al menos dos imagenes" });
  }
 //TODO: posiblemente tendremos un lacalhost:3000/products/asdasd.jpg


 try {
  await db.connect();

  const productInDB = await Product.findOne({ slug: req.body.slug })
  if(productInDB){
    await db.disconnect();
    return res.status(401).json({message:'Slug de producto ya existe'})

  }
    
  const product = new Product ( req.body )

  await product.save()

  await db.disconnect();

  return res.status(200).json( product )
  
 } catch (error) {
  await db.disconnect()
  console.log(error)
  return res.status(400).json({ message: "Revisar logs del servidor" });
  
 }
};
