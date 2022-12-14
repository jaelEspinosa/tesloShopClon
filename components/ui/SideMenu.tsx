/* eslint-disable @next/next/no-img-element */
import { Box, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { AccountCircleOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { useContext, useState } from 'react';
import { AuthContext, UiContext } from "../../context";
import { useRouter } from "next/router";

import AdminPanel from "../admin/AdminPanel";

export const SideMenu = () => {

    const router = useRouter()

    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {

        if (searchTerm.trim().length === 0) return;

        navigateTo(`/search/${searchTerm}`)
        /* setSearchTerm('') */

    }

    const navigateTo = (url: string) => {
        router.push(url)
        setTimeout(() => {
            toggleSideMenu()
        }, 500);
    }

    const onLogOut = () => {

        router.push('/')
        toggleSideMenu();
        setTimeout(() => {

            logout()
        }, 500);

    }


    return (

        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                        aria-label="toggle password visibility"
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }

                        />
                    </ListItem>
                    {isLoggedIn
                        &&
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    {user?.image ? <img style={{
                                        width: '35px',
                                        borderRadius: '50px',
                                        marginRight: '5px',
                                    }} src={user?.image} alt=''

                                    /> || <AccountCircleOutlined /> : <AccountCircleOutlined />}
                                </ListItemIcon>
                                <ListItemText primary={user?.name} />
                            </ListItem>

                            <ListItem 
                                    button 
                                    onClick={()=>navigateTo('/orders/history')}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>


                    }

                    <ListItem button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ni??os'} />
                    </ListItem>

                    {isLoggedIn
                        ? (
                            <ListItem
                                button
                                onClick={onLogOut}
                            >
                                <ListItemIcon>
                                    <LoginOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                        ) : (
                            <ListItem
                                button
                                onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                            >
                                <ListItemIcon>
                                    <VpnKeyOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>
                        )}



                    {/* Admin */}
                    {user?.role === 'admin' &&

                        <AdminPanel />
                    }
                </List>
            </Box>
        </Drawer>
    )
}
