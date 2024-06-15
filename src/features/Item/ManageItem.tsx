import Category from "../../models/Category";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AppDispatch, RootState, store } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem1, getItems, putItem } from "./ItemSlice";
import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { useNavigate, useParams } from "react-router-dom";
import {
  CardActionArea,
  Grid,
  ImageListItem,
  Paper,
  styled,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Product from "../../models/Item";
import Swal from "sweetalert2";
import { postLend } from "../Lend/LendSlice";
import Lend from "../../models/Lend";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  opacity: '0.4 !important'
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            
            color: (theme) => theme.palette.grey[300],
            
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ManageItem = () => {
  const { categoryId } = useParams();
  let items = useSelector((state: RootState) => state.ItemSlice.items);
  const [filteredItems, setFilteredItems] = useState(items);
  const [open, setOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    id: undefined,
    image: "",
    price: undefined,
    qty: 0,
  });
  const LendOneItem = () => {
   
    const item: any = store.getState().ItemSlice.item;
    const user = store.getState().UserSlice.user;
    
    const q = item.qty>0 ? item.qty - 1 : 0;
    
    const newItem: any = {
        id: item.id, name: item.name,
        category: item.category, description: item.description, image: item.image, price: item.price, qty: q
    }
    // dispatch(putItem(newItem))
    

    const currDate = new Date();
    const returnDateN = new Date();
    returnDateN.setDate(returnDateN.getDate() + 6);
    const lend:Lend={lendingDate:currDate,returnDate:returnDateN,user:user,item:item}
    dispatch(addItem(newItem))
    dispatch(postLend(lend))

}
  const handleClickOpen = (item: any) => {
    setOpen(true);
    setProduct(item);
  };

  const del=async (item:any)=>{ 
    dispatch(getItems())
    items= store.getState().ItemSlice.items;
    Swal.fire({
      title:"הפריט נמחק ",
      showConfirmButton: true,
      confirmButtonText: "OK",
      icon: 'warning'})
    
  }
  const handleClose = () => {
    setOpen(false);
  };

//   useEffect(() => {
//     if(items)
//     // const i:any=[];
//     // items.map((x)=>{if(x.category?.id?.toString() === categoryId){i.push(x)}})
//     setFilteredItems(
//       items.filter((item:any) => item.category?.id?.toString() === categoryId)
//     );
//     // setFilteredItems(i)
//   }, [items]);

  const itemfunc=async ()=>{
    if(filteredItems){
    let i:any=[];
    filteredItems.map((x)=>{if(x.category?.id?.toString() === categoryId){i.push(x)}})
    setFilteredItems(i)
    
    }
  }
    useEffect(() => {
     itemfunc()
      
    }, [filteredItems]);

const missQty=()=>{
  Swal.fire({
    title: 'מצטערים, המוצר מושאל',
    showConfirmButton: true,
    confirmButtonText: "OK",
    icon: 'warning'})
}
  

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{marginLeft:'7% !important'}}
      >
        {filteredItems &&
          filteredItems.map((item: any, i: number) => (
            <Grid xs={2} key={i} sx={{marginRight:'2%',marginLeft:'3%',marginTop:'4%'}}>
              <Card key={i}>
                <CardMedia
                 sx={{maxWidth:200,marginLeft:'15%'}}
                  component="img"
                height="200"
                 
                  image={"/picture/pictureItem/" + item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {}
                  </Typography>
                  <CardActions>
                    {<div   style={{marginLeft:'10%'}}>
                      <Button
                    
                        variant="outlined"
                        onClick={() => handleClickOpen(item)}
                      >
                      <CreateIcon/>
                      </Button>
                      <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                       
                      >
                        <div style={{marginLeft:'40%'}}>
                        <BootstrapDialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose}
                        
                        >
                          {product.name}
                        </BootstrapDialogTitle>
                        </div>
                        <DialogContent dividers>
                          <Card key={i}>
                            <CardMedia
                             sx={{maxWidth:400,marginLeft:'15%'}}
                              
                              component="img"
                              // height="300"
                              // width="300"
                              image={"/picture/pictureItem/" + product.image}
                            />
                          </Card>

                          <Typography gutterBottom>
                           {product.description}
                          </Typography>
                        </DialogContent>
                        <DialogActions>

                           {"מחיר:"+ product.price +""}

                          <Button 
                          
                          variant="outlined"
                          onClick={() => 
                           product.qty>0?
                          del(product):missQty()}>
                           { product.qty>0?"להשאלה":"לא זמין"}
                          </Button>
                        </DialogActions>
                      </BootstrapDialog>
                    </div>}
                    <Button 
                    sx={{marginLeft:'10%'}}
                    variant="outlined"
                    onClick={() => 
                     del(item)
                     }>
                        <DeleteIcon/>
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
export default ManageItem;
