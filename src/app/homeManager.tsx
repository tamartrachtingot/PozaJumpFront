import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from '@mui/icons-material/Create';

import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HomePage() {
const nav=useNavigate();
  return (
    
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
        <IconButton 
         size="large"
         edge="start"
         aria-label="menu"
         color="inherit"
         sx={{ mr: 2 }}>

        </IconButton>
        
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
          </IconButton>

        
      
       
  
      </Toolbar>
    </AppBar>
    
  </Box>

 

  );
}