import {useEffect} from 'react';
import NextLink from 'next/link';

import { Button, Card, CardContent, Divider, Grid, Link, Typography, Box, Chip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { OrderSummary, CartList  } from '../../components/cart';

import { CartContext } from '../../context';
import Cookies from 'js-cookie';



const SummaryPage = () => {
  const {shippingAddress, numberOfItems, createOrder} = useContext(CartContext)

  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if(!Cookies.get('firstName')) {
      router.push('/checkout/address')
    }    
   
  }, [router])

  const onCreateOrder = async ()=>{
    setIsPosting(true)   
    const {hasError, message } = await createOrder() 
    
    if (hasError){
      setIsPosting(false)
      setErrorMessage(message)
      return
    }
   
    router.replace(`/orders/${message}`)

  }
  
  if (!shippingAddress){
    return<></>
  }
  
  const {firstName, lastName, address, address2 = '', city, country, phone, zip} = shippingAddress
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
              <Typography variant='h2'>Resumen de su pedido: {numberOfItems} {numberOfItems === 1 ?' Producto' : ' Productos' }</Typography>
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
              <Typography>{firstName}, {lastName}</Typography>
              <Typography>{address}</Typography>
              <Typography>{address2}</Typography>
              <Typography>{zip}, {city}</Typography>
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

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
                <Button 
                    disabled = {isPosting}
                    onClick={onCreateOrder}
                    color='secondary' 
                    className='circular-btn' 
                    fullWidth>
                  Confirmar Orden
                </Button>
               <Chip
                 
                 color = 'error'
                 label = {errorMessage}
                 sx={{width:'100%', mt:'10px', display : errorMessage ? 'flex' : 'none'}}
              />
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  ) 
}

export default SummaryPage
