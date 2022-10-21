import NextLink from 'next/link'


import { GetServerSideProps, NextPage } from 'next'

import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { getSession } from 'next-auth/react';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';




const columns : GridColDef[]=[
    { field : 'id', headerName : 'ID', width: 100},
    { field : 'fullName', headerName : 'Nombre Completo', width: 300},
    { field : 'creada', headerName : 'Creada', width: 150},
    { field : 'numberOfItems', headerName : 'Nº de productos', width: 150},
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra Información si esta pagada la orden',
        width: 200,
        renderCell: (params : GridRenderCellParams)=>{
            return (
               params.row.paid 
               ? <Chip color= 'success' label='Pagada' variant='outlined'/>
               : <Chip color= 'error' label = 'No Pagada'variant='outlined'/>
            )
        }
    },
    {
        field: 'Orden',
        headerName: 'Ver orden',
        description: 'Número de Orden',
        width: 100,
        sortable:false,
        renderCell: (params : GridRenderCellParams)=>{
            return (
             <NextLink href={`/orders/${params.row.lk}`} passHref>
                <Link underline='always'>Ver orden</Link>
             </NextLink>
            )
        }
    },

];



interface Props{
    orders : IOrder[]
}

const HistoryPage: NextPage<Props> = ({orders}) => {    
    

    const rows =  orders.map((order, index) => ({
        id: index+1, 
        paid: order.isPaid, 
        fullName: `${(order.shippingAddress.firstName).toLocaleUpperCase()} ${(order.shippingAddress.lastName.toLocaleUpperCase())}`,
        creada: order.createdAt!.slice(0,10),   //TODO comprobar que fufa
        numberOfItems: order.numberOfItems,
        lk: order._id 
    }))
 

    
  return (
    
    <ShopLayout title={'Historial de pedidos'} pageDescription={'Historial de pedidos del cliente'}>
       <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{ height: 650, width:'100%'}}>
           <DataGrid 
                rows={ rows }
                columns = { columns }
                pageSize={ 10 }
                rowsPerPageOptions={ [10] }
           />
          </Grid>
        </Grid>

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req}) => {
   
    const session: any = await getSession({ req }) 
    
    if(!session){
        return {
            redirect:{
                destination: '/auth/login?p=/orders/history',
                permanent:false
            }
        }
    }
    const orders = await dbOrders.getOrders(session.user._id)
    
    /* const ordersToShow = orders?.filter(order => order.user === session.user._id) */

    if(orders?.length === 0) {
        return {
            redirect:{
                destination: '/orders/historyEmpty',
                permanent:false
            }
        }
    }
    return {
        props: {
         orders  
        }
    }
}

export default HistoryPage
