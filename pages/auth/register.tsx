import { useState, useContext } from 'react';
import { getSession, signIn } from 'next-auth/react';
import NextLink from 'next/link'
import { GetServerSideProps } from 'next';

import { useForm } from 'react-hook-form'

import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { ErrorOutline } from '@mui/icons-material'


import AuthLayout from '../../components/layouts/AuthLayout'
import { useRouter } from 'next/router';
import { validations } from '../../utilities'
import { AuthContext } from '../../context';



type FormData = {
   email: string,
   name: string,
   password: string
}



const RegisterPage = () => {
   const router = useRouter()
   const {registerUser} = useContext(AuthContext)
   const [errorRegister, setErrorRegister] = useState(false)
   const [errorRegisterMessage, setErrorRegisterMessage] = useState('')
   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   const destination = router.query.p?.toString() || '/'

   const onRegisterUser = async ({name, email, password }: FormData) => {      
      
         const {hasError, message} = await registerUser( name, email, password)
         
      if(hasError){
         setErrorRegister(true);
         setErrorRegisterMessage(message!)
         setTimeout(() => { setErrorRegister( false ), setErrorRegisterMessage('') }, 2000);
         return
      }else{
         setErrorRegister(false)
         /* setErrorRegisterMessage('Iniciando sesión..')
         setTimeout(() => { router.replace(destination) }, 1000); */
         await signIn('credentials',{email, password })
         
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
                        label={errorRegisterMessage}
                        color={errorRegister ? 'error' : 'secondary'}
                        icon={errorRegister ? <ErrorOutline /> : <CheckCircleOutlineOutlinedIcon/> }
                        className='fadeIn'
                        sx={{ display: errorRegisterMessage === '' ? 'none' : 'flex' }}
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
                     <NextLink href={`/auth/login?p=${destination}`} passHref>
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


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
   const session = await getSession({ req })

   const{ p = '/' } = query 

   if( session ) {
     return {
        redirect:{
         destination: p.toString(),
         permanent: false
        }
     }
   }

   return {
      props: {}
   }
}

export default RegisterPage