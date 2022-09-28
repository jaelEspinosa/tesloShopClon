import { IProduct } from '../interfaces';
import { Product } from '../models'
import {db} from './'


export const getProductBySlug = async (slug : string): Promise<IProduct | null> =>{

   await db.connect()
  
   const product = await Product.findOne({slug}).lean();


   await db.disconnect()

   if (!product){
    return null;
   }
return JSON.parse(JSON.stringify( product ) );

}
 interface ProductSlug {
   slug: string;
 }

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> =>{

   await db.connect()
   
   const slugs = await Product.find().select('slug -_id').lean()

   await db.disconnect()

   return slugs 
}

export const getProductsByTerm = async (term: string):Promise<IProduct[]> =>{
   term = term.toString().toLowerCase()
  
   await db.connect()
   
   const products = await Product.find( {
     $text :{$search: term} 
   
   })
   .select('title images price inStock slug -_id')
   .lean();

   await db.disconnect()

   return products     // aqui no hace falta parsear porque omitimos el Id y sólo traemos los campos title images... pero no los 
                       // que pueden dar problema
}

export const getAllProducts = async ():Promise<IProduct[]> =>{

  await db.connect()
  
  const products = await Product.find()
    
    .lean();

  await db.disconnect()

  return JSON.parse(JSON.stringify( products ) ); // esto es para parsear a Json porque si no da error en el _id, createdAt y updatedAt por 
                                                  // el formato de mongo

}