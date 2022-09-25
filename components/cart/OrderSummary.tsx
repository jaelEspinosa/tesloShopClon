import { Divider, Grid, Typography } from '@mui/material';


export const OrderSummary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>4</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`€ ${158.01}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (iva 21%)</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`€ ${41.09}`}</Typography>
            </Grid>

            <Divider />

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>TOTAL:</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{`€ ${200.00}`}</Typography>
            </Grid>


        </Grid>
    )
}
