import {useState} from 'react';
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'

import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { tesloApi } from '../../api'

import AuthLayout from '../../components/layouts/AuthLayout'
import { validations } from '../../utilities'

type FormData = {
   email : string,
   password: string
}

const LoginPage = () => {
   
const [errorLogin, setErrorLogin] = useState(false)

const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

const onLoginUser = async ( {email, password} : FormData) =>{
        
      try {
         const {data} = await tesloApi.post('/user/login',{ email, password })
         const {token, user}=data;
         console.log(token, user)
      } catch (error) {
         
         setErrorLogin(true)
         setTimeout(() => { setErrorLogin(false) }, 2000);

      }

      //TODO: navegar a la pantalla en la que estaba el usuario
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
              <NextLink href='/auth/register' passHref>
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