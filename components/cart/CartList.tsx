

import { FC, useContext } from 'react';

import NextLink from 'next/link'



import { Grid, Link, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { ItemCounter } from '../ui';



interface Props {
    products? : IOrderItem[];
    editable?: boolean;
}



export const CartList:FC<Props> = ({editable = false, products }) => {
    
    const {cart, uptateCartQuantity, removeCartProduct, numberOfItems} = useContext(CartContext)
       
    
    
    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number)=>{
        product.quantity = newQuantityValue;
        uptateCartQuantity( product )
    }
    const deleteItem = (product: ICartProduct)=>{
        removeCartProduct(product)
       
    }

    const productsToShow = products ? products : cart
   
    return (
        <>
            
            {
                productsToShow.map((product, index) => (
                    
                    <Grid container spacing={2} key={product.slug+product.size+index} sx={{ mb: 2 }}>
                        <Grid item xs={3}>
                          
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea sx={{ borderRadius: 8 }}>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: 8 }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>

                        </Grid>
                        <Grid item xs={6}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                            {
                                editable  ? <ItemCounter
                                              currentValue={product.quantity} 
                                              maxValue={5} 
                                              updatedQuantity={(value) => onNewCartQuantityValue(product as ICartProduct, value)}
                                              /> :
                                <Typography variant='subtitle1'>{product.quantity}{product.quantity > 1 ? ' Productos' : ' Producto'}</Typography>

                            }
                                
                            </Box>
                        </Grid>
                        <Grid item xs={3} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{product.price} €</Typography>
                            {
                                editable && 
                            <Button
                                variant='text'
                                color='primary'
                                onClick={()=>deleteItem(product as ICartProduct)}
                            >
                             <DeleteOutlineOutlinedIcon />   

                            </Button>
                            }
                        </Grid>
                    </Grid>
                        
                ))
            }
        </>
    )
}
