import { useState, useContext } from 'react';
import NextLink from 'next/link'

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'

import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'


import AuthLayout from '../../components/layouts/AuthLayout'
import { validations } from '../../utilities'
import { AuthContext } from '../../context';

type FormData = {
   email : string,
   password: string
}

const LoginPage = () => {

const router = useRouter();
const destination = router.query.p?.toString() || '/'

const { loginUser, isLoggedIn } = useContext(AuthContext)   
const [errorLogin, setErrorLogin] = useState(false)
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

if(isLoggedIn){
   router.replace(destination)
}
const onLoginUser = async ( {email, password} : FormData) =>{
      
      const isValidLogin = await loginUser( email, password )

      if ( !isValidLogin){
         setErrorLogin(true)
         setTimeout(() => { setErrorLogin(false) }, 2000);
         return
      }
 
      
      router.replace(destination)
}
   
   
  return (
    <AuthLayout title={'Login'}>
    <form onSubmit={handleSubmit(onLoginUser)} noValidate>
    
    <Box sx={{ width: 350 , padding: '10px 20px'}}>
        <Grid container spacing={2}>
           <Grid item xs={12}>
              <Typography sx={{textAlign:'center', mb:'25px'}} variant='h1' component='h1'>Iniciar Sesión</Typography>
              <Chip
                 label = 'El Usuario/Password no coincide'
                 color = 'error'
                 icon ={<ErrorOutline />}
                 className='fadeIn'
                 sx={{ display: !errorLogin ? 'none' : 'flex'}}
              />
           </Grid>
           <Grid item xs={12}>
              <TextField                      
                        type ='email'
                        label='correo'
                        variant='filled' 
                        fullWidth
                        {...register('email', {
                           required: 'Este campo es requerido',
                           validate: validations.isEmail} 
                     )}
                        
                        error = {!!errors.email}
                        helperText={errors.email?.message}
                        />
                        
             
               
           </Grid>
           <Grid item xs={12}>
              <TextField 
                       {...register('password', {required: 'Este campo es requerido', 
                                                 minLength: {value: 6, message:'Minimo 6 caracteres'}}) }
                       label='Contraseña' 
                       type='password' 
                       variant='filled'
                       error = {!!errors.password}
                       helperText={errors.password?.message} 
                       fullWidth/>
               
           </Grid>
           <Grid item xs={12}>
              <Button fullWidth 
                      type='submit'
                      size='large' 
                      color='secondary' 
                      className='circular-btn' 
                      disabled ={errorLogin}
                      >
                Iniciar Sesión
              </Button>
           </Grid>
           <Grid item display='flex' justifyContent='end' xs={12}>
              <NextLink href={`/auth/register?p=${destination}`} passHref>
                <Link underline = 'always'>
                 ¿No tienes Cuenta?
                </Link>
              </NextLink>
           </Grid>
        </Grid>
        
        </Box>
    </form>  

    </AuthLayout>
  )
}

export default LoginPage