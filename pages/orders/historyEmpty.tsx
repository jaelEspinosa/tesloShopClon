import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';

 const HistoryEmptyPage = () => {
  return (
    <ShopLayout title='Historial vacio' pageDescription={'historial vacio'}>
    <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography variant='h1'> Su Historial de compras está vacio</Typography>
                    <NextLink href='/' passHref>
                        <Link typography='h4' color='secondary' fontWeight='800'>
                            Regresar
                        </Link>
                    </NextLink>
                </Box>
            </Box>
    </ShopLayout>
  )
}

export default HistoryEmptyPage
