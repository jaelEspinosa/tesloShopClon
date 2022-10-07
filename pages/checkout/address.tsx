import React from 'react'
import { GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { countries, jwt } from '../../utilities';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '../../context';


type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;

}




const AddressPage = () => {
    const {UpdateAddress} = useContext(CartContext)
    const getAddressFromCoockies = (): FormData =>{
        
        return{
            firstName: Cookies.get('firstName') || '',
            lastName: Cookies.get('lastName') || '',
            address: Cookies.get('address') || '',
            address2: Cookies.get('address2') || '',
            zip: Cookies.get('zip') || '',
            city: Cookies.get('city') || '',
            country:Cookies.get('country') || countries[0].name,
            phone: Cookies.get('phone') || ''
        }

    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
       defaultValues: getAddressFromCoockies()

    });
    const router = useRouter()

    const onSubmitAddress = (data : FormData ) =>{
       router.push ('/checkout/summary')
       UpdateAddress(data)

    }
    
    
    return (
        <ShopLayout title={'Dirección'} pageDescription={'Confirmar dirección del Destino'}>
            <Typography variant='h1' component='h1'>Dirección</Typography>
            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Grid container spacing={2} sx={{ mt: 5 }}>

                    <Grid item xs={12} sm={6}>
                        <TextField                               
                               label='Nombre' 
                               variant='filled' 
                               fullWidth
                               {...register('firstName', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Minimo 2 caracteres' }
                             })}
                             error={!!errors.firstName}
                             helperText={errors.firstName?.message}
                               />
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField 
                                 label='Apellido' 
                                 variant='filled' 
                                 fullWidth 
                                 {...register('lastName', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                 })}
                                 error={!!errors.lastName}
                                 helperText={errors.lastName?.message}
                                 
                                 />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField 
                                 label='Dirección' 
                                 variant='filled' 
                                 fullWidth 
                                 {...register('address', {
                                    required: 'Este campo es requerido',
                                    })}
                                 error={!!errors.address}
                                 helperText={errors.address?.message}
                                 />
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField 
                                 label='Dirección 2(opcional)' 
                                 variant='filled' 
                                 fullWidth 
                                 {...register('address2')}
                                 />
                    </Grid>              

                    <Grid item xs={12} sm={6}>
                        <TextField 
                                label='Código postal' 
                                variant='filled' 
                                fullWidth
                                {...register('zip', {
                                    required: 'Este campo es requerido',
                                    })}
                                 error={!!errors.zip}
                                 helperText={errors.zip?.message}
                                 />
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField 
                                label='Ciudad' 
                                variant='filled' 
                                fullWidth
                                {...register('city', {
                                    required: 'Este campo es requerido',
                                    })}
                                 error={!!errors.city}
                                 helperText={errors.city?.message}
                                
                                />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                               
                                select
                                variant='filled'
                                label='Pais'
                                defaultValue= {Cookies.get('country')} 
                                {...register('country', {
                                    required: 'Este campo es requerido',
                                    })}
                                error={!!errors.country}   
                                                                                  
                                  >
                                 
                                {countries.map(country => (
                                    <MenuItem
                                     key={ country.code }
                                     value={country.name}
                                    >{country.name}</MenuItem>
                                ))

                                }
                            </TextField>
                        </FormControl>
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField 
                                label='Telefono' 
                                variant='filled' 
                                fullWidth
                                {...register('phone', {
                                    required: 'Este campo es requerido',
                                    })}
                                 error={!!errors.phone}
                                 helperText={errors.phone?.message}
                                />
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='center' sx={{ mt: 5 }}>
                <Button  type='submit' color='secondary' className='circular-btn' size='large'>
                         Revisar Pedido
                </Button>
            </Box>
            </form>
          
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = '' } = req.cookies;

    let isValidToken = false;
    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if (!isValidToken) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}








export default AddressPage