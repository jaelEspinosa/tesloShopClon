import { Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const KidsPage = () => {
  const {products, isLoading} =  useProducts('/products?gender=kids')
  return (
    <ShopLayout title={'TesloShop - Niños'} pageDescription='Encuentra los mejores productos de teslo para mujeres aqui'>
    <Typography variant='h1' component='h1'>Niños</Typography>
    <Typography variant='h2' sx={{mb: 1}}>Productos para niños</Typography>
    {
     isLoading 
     ? <FullScreenLoading />
     : <ProductList products = { products } />
    }

 </ShopLayout>
  )
}

export default KidsPage