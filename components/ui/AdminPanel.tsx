import { CategoryOutlined, ConfirmationNumberOutlined, AdminPanelSettings } from '@mui/icons-material'
import { Divider, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const AdminPanel = () => {
  return (
    <>
    <Divider />
    <ListSubheader>Admin Panel</ListSubheader>

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