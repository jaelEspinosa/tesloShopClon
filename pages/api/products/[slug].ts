import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data = 
      |{ message: string } 
      | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;

  switch (req.method) {
    case "GET": {
      return getProductBySlug(req, res);
    }

    default:
      return res.status(400).json({ message: "EndPoint no operativo" });
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   
  const { slug } = req.query
  
  await db.connect();

  const productToFind = await Product.findOne({slug}).lean();

  if (!productToFind) {
    await db.disconnect();
    return res.status(404).json({ message: "el producto no existe" });
  }
  try {
    return res.status(200).json(productToFind);
  
} catch (error) {

    await db.disconnect();
    console.log(error);
    res.status(400).json({ message: "huvo un error en la base de datos" });
  }

  await db.disconnect();
};
