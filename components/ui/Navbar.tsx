import React, { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

import { UiContext } from '../../context';



export const Navbar = () => {
  const router = useRouter()
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
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        {!showSearch &&

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

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

        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={5} color='secondary'>
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
