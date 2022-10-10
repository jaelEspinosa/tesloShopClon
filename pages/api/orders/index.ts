
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch ( req.method ){
 
        case 'POST':
          return createOrder (req, res);
            
        default:
            return res.status(400).json({message: 'opcion no permitida'})

    }
  
  
 
    
  }
  const createOrder = async (req: NextApiRequest, res:NextApiResponse)=>{
    
  
    return  res.status(201).json({message :' hello nen'})
}