/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useContext } from 'react';
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { getSession, signIn, getProviders } from 'next-auth/react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'

import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'


import AuthLayout from '../../components/layouts/AuthLayout'
import { validations } from '../../utilities'
import { AuthContext } from '../../context/auth/AuthContext';




type FormData = {
   email: string,
   password: string
}

const LoginPage = () => {

   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

   const router = useRouter();
   const error = router.query.error
   const destination = router.query.p?.toString() || '/'
   const { isLoggedIn } = useContext(AuthContext)
   const [providers, setProviders] = useState<any>({})

   const [errorSignin, setErrorSignin] = useState(false)

   useEffect(() => {
      getProviders().then(prov => {
         setProviders(prov)

      })

   }, [])

  /*  useEffect(() => {
      if (isLoggedIn) {
         router.replace(destination)
      }

   }, [destination, isLoggedIn, router]) */

   const onLoginUser = async ({ email, password }: FormData) => {
      /*    const isValidLogin = await loginUser( email, password )
         if ( !isValidLogin){
            setErrorLogin(true)
            setTimeout(() => { setErrorLogin(false) }, 2000);
            return
         }      
         router.replace(destination) */
      await signIn('credentials', { email, password })
   }
   useEffect(() => {
      if (error === 'CredentialsSignin') {
         setErrorSignin(true)
         setTimeout(() => {
            setErrorSignin(false)

         }, 2000);
      }


   }, [error])


   return (
      <AuthLayout title={'Login'}>
         <form onSubmit={handleSubmit(onLoginUser)} noValidate>

            <Box sx={{ width: 350, padding: '10px 20px', mt: '150px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography sx={{ textAlign: 'center', mb: '25px' }} variant='h1' component='h1'>Iniciar Sesión</Typography>
                     <Chip
                        label='El Usuario/Password no coincide'
                        color='error'
                        icon={<ErrorOutline />}
                        className='fadeIn'
                        sx={{ display: !errorSignin ? 'none' : 'flex' }}
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
                        {...register('password', {
                           required: 'Este campo es requerido',
                           minLength: { value: 6, message: 'Minimo 6 caracteres' }
                        })}
                        label='Contraseña'
                        type='password'
                        variant='filled'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth />

                  </Grid>
                  <Grid item xs={12}>
                     <Button fullWidth
                        type='submit'
                        size='large'
                        color='secondary'
                        className='circular-btn'
                        disabled={errorSignin}
                     >
                        Iniciar Sesión
                     </Button>
                  </Grid>
                  <Grid item display='flex' justifyContent='end' xs={12}>
                     <NextLink href={`/auth/register?p=${destination}`} passHref>
                        <Link underline='always'>
                           ¿No tienes Cuenta?
                        </Link>
                     </NextLink>
                  </Grid>
                  <Grid item display='flex' justifyContent='end' flexDirection='column' xs={12}>
                     <Divider sx={{ width: '100%', mb: 2 }} />
                     {
                        Object.values(providers).map((provider: any) => {
                           if (provider.id === 'credentials') return (<div key='credentials'></div>)
                           return (
                              <Button
                                 onClick={() => signIn(provider.id)}
                                 key={provider.id}
                                 variant='outlined'
                                 fullWidth
                                 color='primary'
                                 sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                              >
                                 {provider.name}
                                 <img style={{ width: '25px', }} src={`/icons/${provider.name}.png`} alt='logo' />
                              </Button>
                           )
                        })
                     }


                  </Grid>
               </Grid>

            </Box>
         </form>

      </AuthLayout>
   )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const session = await getSession({ req })

   const { p = '/' } = query

   if (session) {
      return {
         redirect: {
            destination: p.toString(),
            permanent: false
         }
      }
   }

   return {
      props: {}
   }
}

export default LoginPage