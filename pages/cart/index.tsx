

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartContext } from '../../context';




const CartPage = () => {
    const { numberOfItems, isLoaded } = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && numberOfItems === 0) {
            router.replace('/cart/empty')
        }
    }, [isLoaded, numberOfItems, router])

    if (!isLoaded || numberOfItems === 0) {
        return (<></>)
    }

    return (
        <ShopLayout title='Carrito - 3' pageDescription={'Contenido del carrito de compra'}>
            <Typography mb={5} variant='h1' component='h1'>Carrito</Typography>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Su pedido</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    color='secondary' 
                                    className='circular-btn' 
                                    href='/checkout/address'
                                    fullWidth>
                                    Confirmar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default CartPage
