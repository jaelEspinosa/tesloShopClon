import { Divider, Grid, Typography } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { format } from '../../utilities';




export const OrderSummary = () => {
    
    const {cart, numberOfItems, subTotal, iva, total} = useContext(CartContext)
    
    


  


    return (
        <Grid container>
            <Grid sx={{mb:'15px'}} item xs={6}>
                <Typography>Cantidad</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{numberOfItems}{' '}{numberOfItems > 1 ? 'Productos': 'Producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{format(subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (iva 21%)</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{format(iva)}</Typography>
            </Grid>

            <Divider />

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>TOTAL:</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{format(total)}</Typography>
            </Grid>


        </Grid>
    )
}
