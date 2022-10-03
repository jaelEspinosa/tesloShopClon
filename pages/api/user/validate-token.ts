import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import {jwt, validations} from '../../../utilities';




type Data = 
 |{ message: string}
 |{ id: string}
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
        case 'GET':
            return checkJWT(req, res)
           

        default:
            res.status(400).json({
                message:'Bad request'
            })
        }
        
    }

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const{ token = '' } = req.cookies;

    let userId = '';
 
    try {
        userId = await jwt.isValidToken(token)
        
    } catch (error) {
        console.log(error)
    }
       
    await db.connect();
        const user = await User.findById ( userId ).lean()
        console.log('este es mi user.....', user)
    await db.disconnect();

    if ( !user ) {
        return res.status(400).json ({message : 'Hubo un error de autenticación'})
    }

    const { _id, name, email, role} = user

    return res.status(200).json({
        token: jwt.signToken(_id, email),
        user:{
            email,
            role,
            name
        }
    })
 
} 