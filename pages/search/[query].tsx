
import { NextPage, GetServerSideProps} from "next"
import { useRouter } from "next/router"

import { Box, Typography } from "@mui/material"



import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"

import { dbProducts } from "../../database"
import { IProduct } from "../../interfaces"

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string
}


const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {
 

  return (
    
    <ShopLayout title={'TesloShop - Home'} pageDescription='Encuentra los mejores productos de teslo aqui'>
       <Typography variant='h1' component='h1'>Buscar Producto</Typography>

       {
        foundProducts 
        ?(
          <Box display='flex'>
            <Typography variant='h2' sx={{mb: 1}}>{`Término de Búsqueda`}</Typography>
             <Typography variant='h2' sx={{ml: 1}} color='secondary' textTransform='capitalize'>{query}</Typography>
          </Box>
        )
        : (
           <Box display='flex' sx={{flexDirection:{xs:'column', sm:'row'} }}>
               <Typography variant='h2' sx={{mb: 0, mr: 1}}>{`Ningún producto`}</Typography>
               <Typography variant='h2' sx={{mr: 1, fontWeight:'bold', textTransform:'capitalize'}} color= 'secondary'>{query}</Typography>

               <Typography variant='h2' sx={{ml: 0, textTransform:'capitalize'}}>{`Pero Hay estos disponibles....`}</Typography>
           </Box> 
          )
         
       }
     
     <ProductList products = { products } />
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    console.log('params',params) 
    const {query= ''} = params as {query: string}
   

    // si no hay productos
    let products = await dbProducts.getProductsByTerm(query)
    const foundProducts = products.length > 0

    //TODO: retornar otros productos 

    if ( !foundProducts ){
       products = await dbProducts.getAllProducts()
    }

    
    return {
        props: {
           products,
           foundProducts,
           query
        }
    }
}

export default SearchPage
