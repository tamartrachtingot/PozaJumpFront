import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import  {AppDispatch, RootState, store}  from "../../app/store";
import Category from "../../models/Category";
import ShowItem from "../Item/ShowItem";
import { categoryIn, getCategorys } from "./CategorySlice";
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { getItems } from '../Item/ItemSlice';
import Item from '../../models/Item';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';



   

const ManageCategory=()=>{
    const nav=useNavigate();
    const items= useSelector((state: RootState) => state.ItemSlice.items);
    const categories = useSelector((state: RootState) => state.CategorySlice.categories);
    const categoryI=useSelector((state: RootState) => state.CategorySlice.category)
    const [filteredItems, setFilteredItems] = useState(items);
    const dispatch: AppDispatch = useDispatch();
    const user1=store.getState().UserSlice.user

    useEffect(() => {
      dispatch(getCategorys())
      dispatch(getItems())
     
    }, []);

    return(
         <>
    <Box  sx={{ flexGrow: 1}}>
      <Grid sx={{marginLeft:'10%',marginTop:'2%'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {categories &&
        categories.map((category: Category,i:number) => (
          <Grid xs={2} sm={4} md={4} key={i}>
          <Card key={i} sx={{ maxWidth: 345 }}>
           <CardMedia
             component="img"
          
             image={"/picture/pictureCategory/"+category.image} 
           />
           <CardContent>
             <Typography gutterBottom variant="h5" component="div">
              {category.name}
             </Typography>
             <Button 
                    sx={{marginLeft:'10%'}}
                    variant="outlined"
                    onClick={()=>{ dispatch(categoryIn(category));
                      nav(`/ManageItem/${category.id}`)}}>
                     < CreateIcon/>
                    </Button>

                    <Button
                    
                    variant="outlined"
                    onClick={() =>nav('')}
                  >
                  
                   <DeleteIcon/> 
                  </Button>
           </CardContent>
       </Card>
       
       </Grid>
   
        ))};
      </Grid>
    </Box>
        </>
        
    )
}
export default ManageCategory
