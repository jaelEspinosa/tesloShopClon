import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IProduct, IType } from '../../../interfaces';
import { DriveFileRenameOutline, Iron, SaveOutlined, TagSharp, TroubleshootRounded, UploadOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { tesloApi } from '../../../api';
import { Product } from '../../../models';







const validTypes = ['shirts', 'pants', 'hoodies', 'hats']
const validGender = ['men', 'women', 'kid', 'unisex']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

interface FormData {
    _id?: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    gender: string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
    
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [newTagValue, setNewTagValue] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)
    const { control, register, handleSubmit, formState: { errors }, getValues, setValue, watch} = useForm<FormData>({
        defaultValues: product
    })

    useEffect(() => {
    const subscription =  watch((value, {name, type}) =>{
     
        if(name === 'title') {
            const newSlug = value.title?.trim()
            .replaceAll(' ','_')
            .replaceAll("'",'')
            .toLocaleLowerCase() || '';
           setValue('slug', newSlug); 
        }
     })
      return () => subscription.unsubscribe(); 
       
      
    }, [setValue, watch])
    

    const onChangeSize = ( size :string )=>{
        const currentSizes = getValues('sizes')

        if( currentSizes.includes( size )){
            return setValue('sizes', currentSizes.filter(s => s!== size), {shouldValidate:true})
        }
        setValue('sizes', [...currentSizes, size], {shouldValidate:true})
    }

    const onDeleteTag = (tag: string) => {
        const currentTags = getValues('tags')  
        // obtengo el array de tags que hay ahora mismo
        setValue('tags', currentTags.filter(t => t !== tag),{shouldValidate:true}) 
        // filtro resultados y obvio los que quiero borrar
        setNewTagValue(tag) 
        //pongo el nuevo valor
      

    }

    const onNewTag = ()=>{
        const newTag = newTagValue.trim().toLocaleLowerCase()
        const currentTags = getValues('tags')  // obtengo el array de tags que hay
        setNewTagValue('') // resteo state
        if (currentTags.includes(newTag)) return;
      
        setValue('tags', [...currentTags, newTag]) // añado el nuevo
        
    }

    const onFilesSelected = async ({target}:ChangeEvent<HTMLInputElement>)=>{
        console.log('subiendo...') 
        if ( !target.files || target.files.length === 0) {
            return;
         }
         console.log(target.files)
         
         try {
             for( const file of target.files){
                const formData = new FormData();
                formData.append('file', file);
                console.log('haciendo post de ', formData)
                const {data}= await tesloApi.post<{message:string}>('/admin/upload', formData)
                console.log('El resultado es....', data.message)
                setValue('images', [...getValues('images'), data.message],{shouldValidate:true})
            }
            
         } catch (error) {
            console.log(error)
         }
    }

    const onDeleteImage = (image:string) =>{
        
         setValue('images', getValues('images').filter(img => img !== image), {shouldValidate: true} )

        

    }


    const onSubmit = async (form: FormData) => {
        setIsSubmiting(true)
      
        if (form.images.length < 2) {
          return alert('Mínimo dos imagenes')
        }
     try {
        const {data} = await tesloApi({
            url: '/admin/products',
            method: form._id ? 'PUT' : 'POST',
            data: form
        })
       console.log('la respuesta es ', data)
       if(!form._id){
        router.replace(`/admin/products/${ form.slug}`)
       } else {
        setIsSubmiting(false)
       }
        
     } catch (error) {
        console.log(error)
        setIsSubmiting(false)
     }

    }

    return (
        <AdminLayout
            title={'Producto'}
            subTitle={`Editando: ${product.title}`}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        color="secondary"
                        startIcon={<SaveOutlined />}
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={isSubmiting}
                    >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />

                        <Controller
                            name="description"
                            rules={{
                                required: "Este campo es requerido",
                            }}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Descripción"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    sx={{ mb: 1 }}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            )}
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Es necesario un valor' }
                            })}
                            error={!!errors.inStock}
                            helperText={errors.inStock?.message}
                        />

                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Es necesario un valor' }
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ e => setValue('type', (e.target.value as IType),{shouldValidate:true}) }
                            >
                                {
                                    validTypes.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ e => setValue('gender', e.target.value,{shouldValidate:true} )}
                            >
                                {
                                    validGender.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel 
                                               key={size} 
                                               control={<Checkbox checked = {getValues('sizes').includes( size )}/>} 
                                               label={size}
                                               onChange={() => onChangeSize( size )}
                                        />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No se permiten espacios' : undefined
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            value={newTagValue}
                            onChange={e=>setNewTagValue(e.target.value)}
                            onKeyUp = {e=> e.code === 'Space' ? onNewTag() :  undefined}
                            fullWidth
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                        />

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                            component="ul">
                            {
                                getValues('tags').map((tag) => {
                                    return (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => onDeleteTag(tag)}
                                            color="primary"
                                            size='small'
                                            sx={{ ml: 1, mt: 1 }}
                                        />
                                    );
                                })}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={<UploadOutlined />}
                                sx={{ mb: 3 }}
                                onClick={()=> fileInputRef.current?.click() } // llamamos al click del input con la ref 'fileInputRef'
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                multiple
                                accept='image/png , image/gif, image/jpeg'
                                style={{display:'none'}}
                                onChange={ onFilesSelected }
                                />

                            <Chip
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{display: getValues('images').length >= 2 ? 'none' : 'flex', mb: 2}}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map(img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia
                                                    component='img'
                                                    className='fadeIn'
                                                    image={img}
                                                    alt={img}
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={()=>{onDeleteImage(img)}}
                                                        >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let product: IProduct | null

    if (slug === 'new') {
        //crear un producto
        const tempProduct= JSON.parse( JSON.stringify( new Product()));
        delete tempProduct._id;
        tempProduct.images= ['img1.jpg','img2.jpg'];
        product = tempProduct
    }else{

        product = await dbProducts.getProductBySlug(slug.toString());
    }


    if (!product) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }


    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage


