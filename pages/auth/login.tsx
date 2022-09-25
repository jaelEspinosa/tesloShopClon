import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import NextLink from 'next/link'

const LoginPage = () => {
  return (
    <AuthLayout title={'Login'}>
        
    <Box sx={{ width: 350 , padding: '10px 20px'}}>
        <Grid container spacing={2}>
           <Grid item xs={12}>
              <Typography sx={{textAlign:'center', mb:'25px'}} variant='h1' component='h1'>Iniciar Sesión</Typography>
           </Grid>
           <Grid item xs={12}>
              <TextField label='correo'variant='filled' fullWidth/>
           </Grid>
           <Grid item xs={12}>
              <TextField label='Contraseña' type='password' variant='filled' fullWidth/>
           </Grid>
           <Grid item xs={12}>
              <Button fullWidth size='large' color='secondary' className='circular-btn' >
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

    </AuthLayout>
  )
}

export default LoginPage