
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import {jwt, validations} from '../../../utilities';



type Data = 
 |{ message: string}
 |{ 
    token: string;
    user:{
       email: string;
       name: string;
       role: string;
    }
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

       switch ( req.method ) {
        case 'POST':
            return registerUser(req, res)
           

        default:
            res.status(400).json({
                message:'Bad request'
            })
        }
        
    }

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const{ email = '' , password = '' , name = '' } = req.body as { email: string, password:string, name:string};
    
    
    if(password.length < 6) {
        return res.status(400).json({message:'La contraseña debe tener 6 caracters o mas'})  
    }
    if(name.length < 2) {
        return res.status(400).json({message:'El nombre debe contener al menos 2 caracteres'})  
    }
    
    

    if (!validations.isValidEmail(email)){
        return res.status(400).json({message:'El correo no es válido'})
    }
    
    await db.connect();
      
    const user = await User.findOne({ email })

    if (user) {
     
     return res.status(400).json({message:'Este correo ya está en uso'})
    }

   const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync( password ),
    role: 'client',
    name
   })

    
    try {
       await newUser.save({ validateBeforeSave:true })  

    } catch (error) {
      const {message = ''} = error as any
      if (message.includes('duplicate key error collection: teslodb.users index: email_1')){
        return res.status(400).json({message:'El email ya esta en uso..'})
      }
      return res.status(500).json({message:'Ver logs del servidor'})
    }
   

   
    const { _id, role } = newUser;
    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user:{
            email,
            role,
            name
        }
    })

}
