import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import Item from "../../models/Item";
import Lend from "../../models/Lend";
import { getItems } from "../Item/ItemSlice";
import { getLends } from "./LendSlice";

const ManagerLend=()=>{
    const dispatch: AppDispatch = useDispatch();
    const lends = useSelector((state: RootState) => state.LendSlice.lends);
    const items = useSelector((state: RootState) => state.ItemSlice.items);
    useEffect(() => {
        dispatch(getLends());
        dispatch(getItems());
      }, []);
    return(
        <>
        <Box  sx={{ flexGrow: 1}}>
          <Grid  container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{marginLeft:'7% !important'}}>
            {lends &&
            lends.map((lend: Lend,i:number) => (
              <Grid xs={2} key={i} sx={{marginRight:'2%',marginLeft:'3%',marginTop:'4%'}}>
              <Card key={i} sx={{ maxWidth: 345 }}>
               <CardMedia
                 component="img"
              
                 image={"/picture/pictureItem/"+lend?.item?.image} 
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                  {lend?.item?.name}
                 </Typography>
                 <Typography gutterBottom variant="h5" component="div">
                 start: {" " + lend.lendingDate} <br />
                 </Typography>
                 <Typography gutterBottom variant="h5" component="div">
                  end: {" " + lend.returnDate} <br />
                 </Typography>
               </CardContent>
           </Card>
           
           </Grid>
       
            ))};
          </Grid>
        </Box>
            </>
            
    )
}
export default ManagerLend;