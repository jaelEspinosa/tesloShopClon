import { useEffect, useState } from 'react';

import useSWR from 'swr';

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import { PeopleOutline } from '@mui/icons-material'

import { tesloApi } from '../../api';
import { AdminLayout } from '../../components/layouts'
import { FullScreenLoadingDashboard } from '../../components/ui/FullScreenLoadingDashboard';
import { IUser } from '../../interfaces';


const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users')
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (data) {
            setUsers(data)
        }

    }, [data])

    if (!data && !error) { return <FullScreenLoadingDashboard /> }



    const onRoleUpdated = async (userId: string, newRole: string) => {
        const previusUsers = users.map(user => ({ ...user }));
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers(updatedUsers)
        try {
            await tesloApi.put('/admin/users', { userId, role: newRole })

        } catch (error) {
            console.log(error)
            setUsers(previusUsers)
            alert('no se pudo actualizar el usuario')
        }

    }

    const columns : GridColDef[]=[
        { field : 'email', headerName : 'Correo', width: 250},
        { field : 'fullName', headerName : 'Nombre Completo', width: 300},
        { 
            field : 'role', 
            headerName : 'Rol', 
            width: 300,
            renderCell:({row}:GridRenderCellParams)=>{
                return (
                    <Select 
                    value={row.role}
                    label='Rol'
                    onChange={e => onRoleUpdated(row.id, e.target.value)}
                    sx={{width: '300px'}}                
                    >
                     <MenuItem value='admin'> Admin </MenuItem> 
                     <MenuItem value='client'> Cliente </MenuItem> 
                     <MenuItem value='super-user'> Super User </MenuItem> 
                     <MenuItem value='SEO'> SEO </MenuItem> 
    
                    </Select>
                )
            }
        },
    ];

     const rows = users.map(user =>({
         id          :user._id,
         email       :user.email,
         fullName    :user.name,
         role        :user.role
     }))
 
    return (
        <AdminLayout
            title={'Usuarios'}
            subTitle={'Administrar usuarios'}
            icon={<PeopleOutline />}
        >

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



export default UsersPage