import { useState, useContext } from 'react';
import {  NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';



import { ICartProduct, IProduct, ISize } from '../../interfaces';

import { dbProducts } from '../../database';
import { ItemCounter } from '../../components/ui';
import { CartContext } from '../../context/cart/CartContext';






interface Props {
  product: IProduct
}


const ProductPage:NextPage<Props> = ({product}) => {

 const [ tempCartProduct, setTemCartProduct ] = useState<ICartProduct>({
    _id:product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1


 })
  const router = useRouter()
  const {addProductToCart} = useContext(CartContext)
  
  const selectedSize = (size : ISize ) =>{
    setTemCartProduct({
      ...tempCartProduct,
      size
    })
  }  
  
  const onUpdatedQuantity = (quantity : number ) =>{
    setTemCartProduct({
      ...tempCartProduct,
      quantity
    })
  }

 const onAddProduct = ()=>{
  if(!tempCartProduct.size) {return;}
  
  
  //TODO: llamar a la accion del contex para agregar al carrio
  
  addProductToCart(tempCartProduct)
  router.push('/cart')
 }
 
 
  
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
        <ItemCounter
            currentValue = {tempCartProduct.quantity}
            maxValue = {product.inStock > 5 ? 5 : product.inStock}
            updatedQuantity = {onUpdatedQuantity} 
          />


        <SizeSelector  
                sizes={product.sizes} 
                selectedSize = {tempCartProduct.size} 
                onSelectedSize={selectedSize} 
            />  
       </Box>
       {/* Agregar al Carrito */}
       {
      product.inStock > 0 ?(
          <Button 
               color='secondary' 
               className='circular-btn'
               onClick={onAddProduct}               
               disabled = {!tempCartProduct.size}
               >
          
            {
              tempCartProduct.size
             ?'Agregar a la cesta ' 
             :'Selecione una talla' 
            }

            </Button>
        ):(
          <Chip label = 'No hay Stock suficiente' color = 'error' variant = 'outlined'/>
        )
       }

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


/* export const getServerSideProps: GetServerSideProps = async ({params}) => {
 
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
} */

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const  productSlugs  = await dbProducts.getAllProductsSlugs()   


  return {
    paths: productSlugs.map(obj =>({
      params:{
        slug: obj.slug
      }
    })),
    fallback: "blocking"
  }
}




export const getStaticProps: GetStaticProps = async ({params}) => {
  const { slug = '' } = params as {slug: string}

  const product = await dbProducts.getProductBySlug(slug)

if (!product){
  return{
    redirect:{
      destination:'/404',
      permanent:false
    }
  }
}
  return {
    props: {
      product
    },
    revalidate:86400,
  }
}

export default ProductPage

