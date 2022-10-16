
import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

import { AdminLayout } from '../layouts';

export const FullScreenLoadingDashboard = () => {
  return (
    <AdminLayout title='cargando' subTitle={''} > 
    <Box              
         display='flex' 
         justifyContent='center' 
         alignItems='center'
         height= 'calc(100vh - 200px)'
         sx={{ flexDirection: 'column', gap: '20px' }}
         >
      <Typography  variant='h1' fontSize={35} fontWeight={200}>Cargando...</Typography>
      <CircularProgress
       thickness={2}
      /> 
    </Box>

 </AdminLayout>
  )
}