import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import GetCategory from "../features/Category/GetCategory";
import CallIcon from "@mui/icons-material/Call";
import pic1 from "../app/backgroundimage.jpg";
import {
  BottomNavigation,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  ScopedCssBaseline,
  Slide,
} from "@mui/material";
import SignIn from "../features/User/SignIn";
import { AppDispatch, RootState, store } from "./store";
import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import Item from "../models/Item";
import Lend from "../models/Lend";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import User from "../models/User";
import { useEffect, useState } from "react";
import { getItems } from "../features/Item/ItemSlice";
import { getLends } from "../features/Lend/LendSlice";
import HomeIcon from "@mui/icons-material/Home";
import { saveUser } from "../features/User/UserSlice";
import { TransitionProps } from "@mui/material/transitions";

//import image from "./public/picture/stylePicture\background.jpg";

export default function HomePage() {
  const user: User = useSelector((state: RootState) => state.UserSlice.user);
  useEffect(() => {
    dispatch(getLends());
    dispatch(getItems());
    dispatch(saveUser(user))
  }, []);
 
  const [open, setOpen] = React.useState(false);
  const nav = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.ItemSlice.items);
  const [auth, setAuth] = React.useState(true);
  const [filteredItems, setFilteredItems] = React.useState(items);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showCategory, setShowCategory] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const [value, setValue] = React.useState(0);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleCloseAndShowCategory = () => {
  //   setOpen(false);
  //   setShowCategory(true);
  // };
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "pink" }}>
          <Toolbar>
            <img
              src="\picture\stylePicture\logoKituv.png"
              width="200"
              height="100"
            />
            

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {user.status===1||
            <IconButton 
             size="large"
             edge="start"
             aria-label="menu"
             color="inherit"
             sx={{ mr: 2 }}>
              <CallIcon />
            </IconButton>}
            {user.status===1||
            <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={() => {
                  if (user.id==null) nav("SignIn");
                  else nav("/GetCategory");
                }}
              >
                <HomeIcon />
              </IconButton>}
              {user.status===1||
              <LendHistory />}
            {/* <Button color="inherit" onClick={() => nav("SignIn")}>
              Login
            </Button> */}
            {user.status===1||
            <Button variant="outlined" color="inherit" onClick={() => {nav("SignIn");
            handleClickOpenLogin()}}>
            Login
      </Button>}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
      <SignIn/>
      </Dialog>
      {user.status===1&&
      <IconButton 
         size="large"
         edge="start"
         aria-label="menu"
         color="inherit"
         sx={{ mr: 2 }}
         onClick={() => {
          nav("/ManagerLend");}}>
         <HistoryIcon/> 
        </IconButton>}
        {user.status===1&&
        <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => {
              nav("/ManageCategory");
            }}
          >
            <HomeIcon />
          </IconButton>}


          </Toolbar>
        </AppBar>
        
      </Box>
    </>
  );
}

export const LendHistory = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getLends());
    dispatch(getItems());
  }, []);
  const user: User = useSelector((state: RootState) => state.UserSlice.user);
  const lends = useSelector((state: RootState) => state.LendSlice.lends);
  const [filteredLends, setFilteredLends] = useState(lends);


  const showHistoryLend = () => {
    const i:any=[];
    lends.map(
      (l) =>{if(l.user?.id === user.id)  {i.push(l)} }
    );
    setFilteredLends(i)
  };
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(filteredLends[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: Lend) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <IconButton 
       size="large"
       edge="start"
       aria-label="menu"
       color="inherit"
       sx={{ mr: 2 }}
      onClick={() => showHistoryLend()}>
        <HistoryIcon onClick={handleClickOpen} />
      </IconButton>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        lends={filteredLends}
      />
    </div>
  );
};
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: Lend;
  onClose: (value: Lend) => void;
  lends: Array<Lend>;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, lends } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: Lend) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Lend History</DialogTitle>
      <List sx={{ pt: 0 }}>
        {lends&& lends.map((l) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(l)}>
              <ListItemAvatar >
                <Typography>
                item: {l.item?.description}
                </Typography>
                <Typography>
                start: {" " + l.lendingDate}
                </Typography>
                <Typography>
                 end: {" " + l.returnDate} <br />
                 </Typography>
                <img
                  style={{ width: "50", height: "50" }}
                  src={"/picture/pictureItem/" + l.item?.image}
                ></img>
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
