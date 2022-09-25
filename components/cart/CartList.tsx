

import { Grid, Link, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { FC } from 'react'
import { initialData } from '../../database/products'
import NextLink from 'next/link'
import { ItemCounter } from '../ui';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const productsInCart = [
    initialData.products[0],  // datos provisionales en duro 
    initialData.products[1],  // datos provisionales en duro 
    initialData.products[4],
    initialData.products[8]  // datos provisionales en duro 
]
interface Props {
    editable?: boolean;
}

export const CartList:FC<Props> = ({editable = false}) => {
    return (
        <>
            {
                productsInCart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb: 2 }}>
                        <Grid item xs={3}>
                            {/* //TODO llevar a la pagina del producto  */}
                            <NextLink href='/product/slug' passHref>
                                <Link>
                                    <CardActionArea sx={{ borderRadius: 8 }}>
                                        <CardMedia
                                            image={`products/${product.images[0]}`}
                                            component='img'
                                            sx={{ borderRadius: 8 }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>

                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>M</strong></Typography>
                            {
                                editable ? <ItemCounter /> :
                                <Typography variant='subtitle1'>3</Typography>

                            }
                                
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{product.price} €</Typography>
                            {
                                editable && 
                            <Button
                                variant='text'
                                color='primary'
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
