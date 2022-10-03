import { useState } from 'react'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'

import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material'


import AuthLayout from '../../components/layouts/AuthLayout'
import { validations } from '../../utilities'
import { tesloApi } from '../../api'
import { ErrorOutline } from '@mui/icons-material'


type FormData = {
   email: string,
   name: string,
   password: string
}



const RegisterPage = () => {
   const [errorRegister, setErrorRegister] = useState(false)
   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   const onRegisterUser = async ({ email, name, password }: FormData) => {

      try {

         const { data } = await tesloApi.post('/user/register', { email, name, password })
         const { token, user } = data
         console.log(token, user)

      } catch (error) {

         setErrorRegister(true)
         setTimeout(() => { setErrorRegister(false) }, 2000);
      }


   }
   return (
      <AuthLayout title={'Login'}>

         <Box sx={{ width: 350, padding: '10px 20px' }}>
            <form onSubmit={handleSubmit(onRegisterUser)} noValidate>

               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography sx={{ textAlign: 'center', mb: '25px' }} variant='h1' component='h1'>Nuevo Usuario</Typography>
                     <Chip
                        label='Email ya registrado'
                        color='error'
                        icon={<ErrorOutline />}
                        className='fadeIn'
                        sx={{ display: !errorRegister ? 'none' : 'flex' }}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        label='Nombre'
                        variant='filled'
                        fullWidth
                        {...register('name', {
                           required: 'Este campo es requerido',
                           minLength: { value: 2, message: 'Minimo 2 caracteres' }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        type='email'
                        label='correo'
                        variant='filled'
                        fullWidth
                        {...register('email', {
                           required: 'Este campo es requerido',
                           validate: validations.isEmail
                        }
                        )}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        label='Contraseña'
                        type='password'
                        variant='filled'
                        {...register('password', {
                           required: 'Este campo es requerido',
                           minLength: { value: 6, message: 'Minimo 6 caracteres' }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <Button
                        fullWidth
                        type='submit'
                        size='large'
                        color='secondary'
                        className='circular-btn'
                        disabled={errorRegister}
                     >
                        Crear Cuenta
                     </Button>
                  </Grid>
                  <Grid item display='flex' justifyContent='end' xs={12}>
                     <NextLink href='/auth/login' passHref>
                        <Link underline='always'>
                           ¿Ya tienes Cuenta?
                        </Link>
                     </NextLink>
                  </Grid>
               </Grid>
            </form>

         </Box>

      </AuthLayout>
   )
}

export default RegisterPage