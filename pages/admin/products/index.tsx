

import React from 'react'

import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Grid, CardMedia, Link, Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import useSWR from 'swr';
import { AdminLayout } from '../../../components/layouts';
import { FullScreenLoadingDashboard } from '../../../components/ui/FullScreenLoadingDashboard';
import {IProduct} from '../../../interfaces';
import NextLink from 'next/link';


const columns : GridColDef[]=[
    {   field : 'img', 
        headerName : 'foto',
        
        
        renderCell:({row}:GridRenderCellParams) =>{

            return(
                <a href={`/product/${ row.slug }`} target='_blank' rel="noreferrer">
                   <CardMedia
                      component = 'img'
                      className = 'fadeIn'
                      image={ row.img }
                      alt={ row.title }
                   />

                </a>
            )
        }
    },
    {   field : 'title', 
        headerName : 'Producto', 
        width: 350,
        renderCell:({row}:GridRenderCellParams) =>{
            return(
               <NextLink
                    href={`/admin/products/${row.slug}`}
                    passHref
                    >
                  <Link underline='hover'>{row.title}</Link> 
               </NextLink>
            )
        }
    },
    { field : 'gender', headerName : 'Género'},
    { field : 'type', headerName : 'Tipo'},
    { field : 'inStock', headerName : 'En Stock', align:'center'},
    { field : 'price', headerName : 'Precio', align:'center'},
    { field : 'sizes', headerName : 'Tallas', width: 250},
    

];

const ProductsPage = () => {

    const { data, error } = useSWR<IProduct[]> ('/api/admin/products')

    if( !data && !error ) {return <FullScreenLoadingDashboard/>}
        
    const rows = data!.map(product =>({
        id:product._id,
        img: product.images[0],
        title:product.title,
        gender:product.gender,
        type:product.type,
        inStock: product.inStock,
        price: product.price + ' €',
        sizes: product.sizes.join(' , '),
        slug: product.slug

    }))

    return (
        <AdminLayout
            title={`Productos (${data?.length})`}
            subTitle={'Mantenimiento de productos'}
            icon={<CategoryOutlined />}
            >

        <Box display='flex' justifyContent='end' sx={{mb:2}} >
            <Button
            startIcon={<AddOutlined />}
            color='secondary'
            href='/admin/products/new'    
            >
             Nuevo Producto
            </Button>
            </Box>        
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

export default ProductsPage