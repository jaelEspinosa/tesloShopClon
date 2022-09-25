import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const AddressPage = () => {
    return (
        <ShopLayout title={'Dirección'} pageDescription={'Confirmar dirección del Destino'}>
            <Typography variant='h1' component='h1'>Dirección</Typography>
            <Grid container spacing={ 2 } sx={{ mt : 5 }}>

                <Grid item xs={12} sm={6}>
                    <TextField label='Nombre' variant='filled' fullWidth />
                </Grid><Grid item xs={12} sm={6}>
                    <TextField label='Apellido' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección' variant='filled' fullWidth />
                </Grid><Grid item xs={12} sm={6}>
                    <TextField label='Dirección 2' variant='filled' fullWidth />
                </Grid>

                
                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección' variant='filled' fullWidth />
                </Grid><Grid item xs={12} sm={6}>
                    <TextField label='Dirección 2 (Opcional)' variant='filled' fullWidth />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField label='Código postal' variant='filled' fullWidth />
                </Grid><Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' variant='filled' fullWidth />
                </Grid>

                
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                          variant='filled'
                          label='Pais'
                          value={1}
                        >
                            <MenuItem value={1}>España</MenuItem>
                            <MenuItem value={2}>Portugal</MenuItem>
                            <MenuItem value={3}>Italia</MenuItem>
                        </Select>
                    </FormControl>
                </Grid><Grid item xs={12} sm={6}>
                    <TextField label='Telefono' variant='filled' fullWidth />
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='center' sx={{ mt : 5 }}>
                <Button color='secondary' className='circular-btn' size='large'>
                    Revisar Pedido
                </Button>
            </Box>
        </ShopLayout>
    )
}

export default AddressPage