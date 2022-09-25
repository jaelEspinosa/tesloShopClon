

import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { CartList } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { OrderSummary } from '../../components/cart';

const CartPage = () => {
    return (
        <ShopLayout title='Carrito - 3' pageDescription={'Contenido del carrito de compra'}>
            <Typography mb={5} variant='h1' component='h1'>Carrito</Typography>
            <Grid container>
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
                                <Button color='secondary' className='circular-btn' fullWidth>
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
