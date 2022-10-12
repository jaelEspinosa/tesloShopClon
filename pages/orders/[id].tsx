


import { GetServerSideProps, NextPage } from 'next'
import { Card, CardContent, Divider, Grid, Link, Typography, Box, Chip } from '@mui/material';


import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';

import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';



interface Props {
    order: IOrder
}


const OrderPage:NextPage<Props> = ({order}) => {

    
    
    const {isPaid, _id, shippingAddress, numberOfItems} = order
    return (
        <ShopLayout title='Resumen de la Orden' pageDescription={'Resumen de la orden'}>
            <Typography mb={5} variant='h1' component='h1'>Orden: {_id}</Typography>
            <Chip
                sx={{ my : 2, display: !isPaid ? 'inerit' : 'none' }}
                label='Pendiente de Pago'
                variant='outlined'
                color='error'
                icon = {<CreditCardOffOutlined />}
            />
            <Chip
                sx={{ my: 2, display : isPaid ? 'inerit' : 'none'}}
                label='Pedido Pagado'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products = {order.orderItems}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen({numberOfItems}) {numberOfItems > 1 ? 'Productos' : 'Producto'}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>

                            </Box>
                            <Typography sx={{textTransform:'capitalize'}}>{shippingAddress.firstName.toLowerCase()} {shippingAddress.lastName.toLowerCase()}</Typography>
                            <Typography>{shippingAddress.address}</Typography>
                            <Typography>{shippingAddress.address2}</Typography>
                            <Typography>{shippingAddress.zip}, {shippingAddress.city}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 3 }} />
                            
                            <OrderSummary orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                iva: order.iva,
                            }}  />
                            <Box sx={{ mt: 3 }} display='flex' flexDirection={'column'}>
                              
                              {
                                order.isPaid ? (
                                    <Chip                                  
                                        sx={{ my: 2}}
                                        label='Pedido Pagado'
                                        variant='outlined'
                                        color='success'
                                        icon={<CreditScoreOutlined />}
                                    />
                                ):(
                                    <h1>Pagar</h1>
                                )
                              }
                              
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const {id = ''} = query
    const session: any = await getSession({ req })
   
    if(!session){
        return {
            redirect:{
                destination:`/auth/login?p=/orders/${id}`,
                permanent:false
            }
        }
    }
    
    const order = await dbOrders.getOrderById( id.toString() )
    
    if(!order){       
        return {                       
            redirect:{
                destination:'/orders/history',
                permanent:false
            }
        }
    }
    if (order.user !== session.user._id){
        
        return {
            redirect:{
                destination:'/orders/history',
                permanent:false
            }
        }

    }
    return {
        props: {
            order
        }
    }
}



export default OrderPage
