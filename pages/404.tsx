import React from 'react'
import { ShopLayout } from '../components/layouts'
import { Box, Typography } from '@mui/material';

const bad404 = () => {
  return (
    <ShopLayout title='pagina no encontrada' pageDescription='Nada que mostrar' > 
       <Box              
            display='flex' 
            justifyContent='center' 
            alignItems='center'
            height= 'calc(100vh - 200px)'  
                  
            sx={{ flexDirection: {xs: 'column', sm: 'row' } }}
            >
         <Typography  variant='h1' fontSize={75} fontWeight={200}>404 |</Typography>
         <Typography  variant='h2' marginLeft={2}>Pagina no encontrada</Typography>
       </Box>

    </ShopLayout>
  )
}

export default bad404