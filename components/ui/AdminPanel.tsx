import { CategoryOutlined, ConfirmationNumberOutlined, AdminPanelSettings } from '@mui/icons-material'
import { Divider, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import React from 'react'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UiContext } from '../../context';

const AdminPanel = () => {
const router = useRouter()
const {toggleSideMenu} = useContext(UiContext)

const navigateTo = (url:string)=>{
    toggleSideMenu()
    router.push(url)
    
}
  return (
    <>
    <Divider />
    <ListSubheader>Admin Panel</ListSubheader>

    <ListItem button onClick={()=>navigateTo('/admin')}>
        <ListItemIcon>
            <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={'DashBoard'} />
    </ListItem>
    <ListItem button>
        <ListItemIcon>
            <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={'Productos'} />
    </ListItem>
    <ListItem button>
        <ListItemIcon>
            <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={'Ordenes'} />
    </ListItem>

    <ListItem button>
        <ListItemIcon>
            <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={'Usuarios'} />
    </ListItem>

</>
  )
}

export default AdminPanel