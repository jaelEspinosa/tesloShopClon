import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts/ShopLayout';


const columns : GridColDef[]=[
    { field : 'id', headerName : 'ID', width: 100},
    { field : 'fullName', headerName : 'Nombre Completo', width: 300},
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
             <NextLink href={`/orders/${params.row.id}`} passHref>
                <Link underline='always'>Ver orden</Link>
             </NextLink>
            )
        }
    },

];

const rows = [
    {id: 1, paid:false, fullName: 'Jose Antonio Espinosa'},
    {id: 2, paid:true, fullName: 'Raul Rodriguez'},
    {id: 3, paid:false, fullName: 'Alonso Gutierrez'},
    {id: 4, paid:false, fullName: 'Fernando Ramirez'},
    {id: 5, paid:true, fullName: 'Roberto Bellota'},
    {id: 6, paid:false, fullName: 'Miguel Angel Jimenez'}
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de pedidos'} pageDescription={'Historial de pedidos del cliente'}>
       <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        <Grid container>
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

export default HistoryPage
