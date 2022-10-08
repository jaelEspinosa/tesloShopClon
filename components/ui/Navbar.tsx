/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';
import React, { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { UiContext, CartContext, AuthContext } from '../../context';





export const Navbar = () => {
  
  
  const router = useRouter()
  const { user, isLoggedIn } = useContext(AuthContext)
  const { numberOfItems } = useContext(CartContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false)

  const onSearchTerm = () => {

    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`)
    /* setSearchTerm('') */

  }

  const navigateTo = (url: string) => {
    router.push(url)

  }

  const { toggleSideMenu } = useContext(UiContext)
 
  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center' >
            <Typography variant='h6'>Teslo | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        {!showSearch &&

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {isLoggedIn && 
               <Box sx={{display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Typography color='secondary' sx={{ fontSize: '14px' , display:'flex', alignItems:'flex-end'}}>
               {user?.image ? <img style={{
                              width:'25px',
                              borderRadius:'50px',
                              marginRight:'5px'
                 
                          }} src={user?.image} alt='avatar'/> : <AccountCircleOutlinedIcon /> } 
                {user?.name}
              </Typography>
               </Box>
            }
            <NextLink href={'/category/men'} passHref >
              <Link>
                <Button color={router.pathname === '/category/men' ? 'primary' : 'info'}
                >Hombres</Button>
              </Link>
            </NextLink>
            <NextLink href={'/category/women'} passHref >
              <Link>
                <Button color={router.pathname === '/category/women' ? 'primary' : 'info'}
                >Mujeres</Button>
              </Link>
            </NextLink>
            <NextLink href={'/category/kid'} passHref >
              <Link>
                <Button color={router.pathname === '/category/kid' ? 'primary' : 'info'}
                >Niños</Button>
              </Link>
            </NextLink>


          </Box>
        }


        <Box flex={1} />

        {/* Pantallas grandes */}



        {!showSearch &&
          <IconButton
            className='fadeIn'
            sx={{
              display: { xs: 'none', sm: 'flex' }
            }}
            onClick={() => {
              setShowSearch(!showSearch)

            }}

          >
            <SearchOutlined />
          </IconButton>}

        {showSearch &&

          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? onSearchTerm() : null}
            onKeyUp={e => e.key === 'Enter' ? setShowSearch(!showSearch) : null}
            type='text'
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowSearch(false)
                    setSearchTerm('')
                  }}
                  aria-label="toggle password visibility"
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }

          />
        }


        {/*Pantallas pequeñas  */}

        <IconButton
          sx={{
            display: { xs: 'flex', sm: 'none' }
          }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href={numberOfItems > 0 ? '/cart' : '/cart/empty'} passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 0 ? (numberOfItems > 9 ? '+9' : numberOfItems) : null} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>
          Menú
        </Button>

      </Toolbar>

    </AppBar>
  )
}
