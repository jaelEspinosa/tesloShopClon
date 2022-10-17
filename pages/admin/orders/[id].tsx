


import { GetServerSideProps, NextPage } from 'next'
import { Card, CardContent, Divider, Grid, Typography, Box, Chip } from '@mui/material';

import { ConfirmationNumberOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSummary } from '../../../components/cart';

import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts/AdminLayout';



interface Props {
  order: IOrder
}
const AdminOrderPage: NextPage<Props> = ({ order }) => {
  const { isPaid, _id, shippingAddress, numberOfItems } = order

  return (
    <AdminLayout title='Detalle de la Orden' subTitle={`Orden: ${_id}`} icon={<ConfirmationNumberOutlined/>}>
     
      <Chip
        sx={{ my: 2, display: !isPaid ? 'inerit' : 'none' }}
        label='Pendiente de Pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2, display: isPaid ? 'inerit' : 'none' }}
        label='Pedido Pagado'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container className='fadeIn'>

        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen({numberOfItems}) {numberOfItems > 1 ? 'Productos' : 'Producto'}</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>
              <Typography sx={{ textTransform: 'capitalize' }}>{shippingAddress.firstName.toLowerCase()} {shippingAddress.lastName.toLowerCase()}</Typography>
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
              }} />
              <Box sx={{ mt: 3 }} display='flex' flexDirection={'column'}>
               
                <Chip
                  sx={{ my: 2, display: !isPaid ? 'none' : 'inerit' }}
                  label='Pedido Pagado'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />

                <Chip
                  sx={{ my: 2, display: !isPaid ? 'inerit' : 'none' }}
                  label='Pendiente de Pago'
                  variant='outlined'
                  color='error'
                  icon={<CreditCardOffOutlined />}
                />

              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query

  const order = await dbOrders.getOrderById(id.toString())

  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
        permanent: false
      }
    }
  }

  return {
    props: {
      order
    }
  }
}

export default AdminOrderPage