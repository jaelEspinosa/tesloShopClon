
import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

import { Box, Typography, Link } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';




const EmptyPage = () => {
    return (
        <ShopLayout title={'Carrito Vacio'} pageDescription={'No hay productos en el Carrito'} >
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography variant='h1'> Su Carrito está vacio</Typography>
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

export default EmptyPage