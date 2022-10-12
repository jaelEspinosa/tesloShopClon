import { Divider, Grid, Typography } from '@mui/material';
import { useContext, useState, useEffect, FC } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { format } from '../../utilities';
import { IOrder } from '../../interfaces/order';

interface Props{
      orderValues?:{
        numberOfItems: number;
        subTotal: number;
        total: number;
        iva: number
      }
}


export const OrderSummary:FC<Props> = ({orderValues}) => {
    
    const { numberOfItems, subTotal, iva, total} = useContext(CartContext)
    
    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, iva, total}

    
 

    return (
        <Grid container>
            <Grid sx={{mb:'15px'}} item xs={6}>
                <Typography>Cantidad</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
             <Typography>{summaryValues.numberOfItems}{' '}{summaryValues.numberOfItems > 1 ? 'Productos': 'Producto'}</Typography>
               
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{format(summaryValues.subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (iva 21%)</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{format(summaryValues.iva)}</Typography>
            </Grid>

            <Divider />

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>TOTAL:</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{format(summaryValues.total)}</Typography>
            </Grid>


        </Grid>
    )
}
