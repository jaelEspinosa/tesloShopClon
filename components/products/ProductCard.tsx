import React, { FC, useMemo, useState } from 'react'
import NextLink from 'next/link'
import { CardActionArea, Grid, Card, CardMedia, Box, Typography, Link, Chip } from '@mui/material';

import { IProduct } from '../../interfaces/products';


interface Props {
  product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
  const {inStock} = product
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // se puede usar la condicion en el use memo para elegir una imagen u otra o bien hacer la condicion en la misma imagen
  // como pone mas abajo linea 36
  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`
  }, [isHovered, product.images])



  return (
    <Grid item xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
            {
              inStock === 0 && 
             <Chip
                 color = 'primary'
                 label = 'No disponible'
                 sx={{position : 'absolute', zIndex: 99, top : '10px', left: '10px'}}
              />
            } 
              <CardMedia
                component='img'
                className='fadeIn'
                // esto es una forma de elegir una u otra imagen 
                // image={!isHovered ? `products/${product.images[0]}` : `products/${product.images[1]}`}
                // la otra opcion es con el useMemo mas arriba linea 16
                image={productImage}
                alt={product.title}
                onLoad={()=>setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none'}} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{product.price} €</Typography>
      </Box>
    </Grid>
  )
}
