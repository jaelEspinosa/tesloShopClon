import NextLink from 'next/link'
import { Card, CardContent, Divider, Grid, Link, Typography, Box, Chip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { CartList } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { OrderSummary } from '../../components/cart';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';


const OrderPage = () => {
    return (
        <ShopLayout title='Resumen de la Orden 132312645' pageDescription={'Resumen de la orden'}>
            <Typography mb={5} variant='h1' component='h1'>Orden: ABC123</Typography>
            {/* <Chip
        sx={{ my : 2}}
        label='Pendiente de Pago'
        variant='outlined'
        color='error'
        icon = {<CreditCardOffOutlined />}
    /> */}
            <Chip
                sx={{ my: 2 }}
                label='Pedido Pagado'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen de su pedido</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>


                                <NextLink href='/checkout/address' passHref>
                                    <Link
                                        display='flex'
                                        alignItems='center'
                                        color='secondary'
                                        sx={{ ':hover': { color: 'lightBlue' } }}>
                                        <EditOutlinedIcon />
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography>José Antonio Espinosa</Typography>
                            <Typography>Golondrina, 20</Typography>
                            <Typography>11500, pto Sta Maria</Typography>
                            <Typography>Cádiz, Spain</Typography>
                            <Typography>+34 659785632</Typography>

                            <Divider sx={{ my: 3 }} />

                            <NextLink href='/cart' passHref>
                                <Link
                                    sx={{ mb: 2, ':hover': { color: 'lightBlue' } }}
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='end'
                                    color='secondary'>
                                    <EditOutlinedIcon />
                                </Link>
                            </NextLink>

                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label='Pedido Pagado'
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage
