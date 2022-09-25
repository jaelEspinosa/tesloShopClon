import NextLink from 'next/link'
import { Button, Card, CardContent, Divider, Grid, Link, Typography, Box } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { CartList } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { OrderSummary } from '../../components/cart';


const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de Orden' pageDescription={'Resumen de la orden'}>
      <Typography mb={5} variant='h1' component='h1'>Resumen de la orden</Typography>
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
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirmar Orden
                </Button>

              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage