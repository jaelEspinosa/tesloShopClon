import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material';
import {FC} from 'react'

interface Props{
   currentValue: number;
   maxValue: number;

   //methods

   updatedQuantity: (newValue:number) => void;

}



export const ItemCounter:FC<Props> = ({currentValue, maxValue, updatedQuantity}) => {



  
  return (
    <Box
     display='flex'
     alignItems='center'
    >
        <IconButton 
            onClick={()=> currentValue > 1 ? updatedQuantity(currentValue-1) : null}  
        >
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{width: 40, textAlign: 'center'}}>{currentValue}</Typography>
        <IconButton 
           onClick={()=> currentValue < maxValue ?  updatedQuantity(currentValue+1) : null}  
        >
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
