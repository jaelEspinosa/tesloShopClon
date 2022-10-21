

import React from 'react'
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Grid, MenuItem, Select, chipClasses, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IOrder, IUser } from '../../../interfaces';
import useSWR from 'swr';
import { FullScreenLoadingDashboard } from '../../../components/ui/FullScreenLoadingDashboard';



const columns : GridColDef[]=[
    { field : 'id', headerName : 'Orden Id', width: 215},
    { field : 'email', headerName : 'Correo', width: 250},
    { field : 'fullName', headerName : 'Nombre Completo', width: 250},
    { field : 'total', headerName : 'Importe Total', width: 150},
    { 
        field : 'isPaid', 
        headerName : 'Pagada', 
        width: 150,
        renderCell:({row}:GridRenderCellParams)=>{
            return row.isPaid 
            ? (<Chip variant='outlined' label='Pagada' color='success' /> )
            : (<Chip variant='outlined' label='Pendiente' color='error' /> )
            
        }
    },
    { field : 'noProducts', headerName : 'Nº de Productos',align:'center', width: 150},
    { 
        field : 'check', 
        headerName : 'Ver Orden', 
        width: 100,
        renderCell:({row}:GridRenderCellParams)=>{
            return (
               <a 
                  style={{
                    textDecoration:'none',
                    textTransform:'capitalize',
                    color:'gray'
                  }}
                  href ={`/admin/orders/${row.id}`} 
                  target='_blank' 
                  rel="noreferrer">
                    Ver Orden
                </a> 
            )
           
            
        }
    },
    { field : 'createdAt', headerName : 'Creada en', width: 150},

];

const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]> ('/api/admin/orders')

    if( !data && !error ) {return <FullScreenLoadingDashboard/>}
       
    const rows = data!.map(order =>({
        
        id: order._id,
        email: (order.user as IUser).email, 
        fullName: (order.user as IUser).name, 
        total: (order.total).toFixed(2)+' €',
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: (order.createdAt!).slice(0,10) + ' --- ' +order.createdAt!.slice(11, 16)


    }))

    return (
        <AdminLayout
            title={'Ordenes'}
            subTitle={'Mantenimiento de Ordenes'}
            icon={<ConfirmationNumberOutlined />}>
        <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                   <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>



        </AdminLayout>
    )
}

export default OrdersPage