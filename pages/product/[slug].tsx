import { GetServerSideProps, NextPage } from 'next'
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';

import { SizeSelector } from '../../components/products/SizeSelector';
import { IProduct } from '../../interfaces';
import Product from '../../models/Product';
import { dbProducts } from '../../database';


// const product = initialData.products[0] // esto es provisional datos dummy

interface Props {
  product: IProduct
}


const ProductPage:NextPage<Props> = ({product}) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
    
    <Grid container spacing={3}>
    <Grid item xs={ 12 } sm={ 7 }>

     <ProductSlideshow images={product.images} />
    </Grid>
    <Grid item xs = {12} sm= {5}>
      <Box display='flex' flexDirection='column'>

        {/* titulos */}
       <Typography variant='h1' component='h1'>{product.title}</Typography>
       <Typography variant='subtitle1' component='h2'>{product.price} €</Typography>

       {/* Cantidad */}
       <Box sx={{my: 2 }}>
       <Typography variant='subtitle2' component='h2'>Cantidad</Typography>
        <ItemCounter />
        <SizeSelector  sizes={product.sizes} />  
       </Box>
       {/* Agregar al Carrito */}

       <Button color='secondary' className='circular-btn'>Agregar a la cesta</Button>

       {/* <Chip label='No hay Stock suficiente' color='error' variant='outlined'/> */}

       {/* Descripcion */}
      <Box sx={{ mt:3 }}>
        <Typography variant='subtitle2'>Descripción</Typography>
        <Typography variant='body2'>{product.description}</Typography>
        </Box>

      </Box>
    </Grid>

    </Grid>
   


    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
 
  const { slug } = params as {slug: string}

  const product = await dbProducts.getProductBySlug(slug)

  if(!product){
    return{
        redirect:{
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: {
      product
    }
  }
}

export default ProductPage