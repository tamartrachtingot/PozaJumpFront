import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import User from '../../models/User';
import { getUsers, saveUser } from './UserSlice';
import { useEffect } from 'react';
import HomePage from '../../app/HomePage';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch:AppDispatch=useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, []);

const users = useSelector((state: RootState) => state.UserSlice.users);
const nav=useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user=users.find((u:User)=>u.email==data.get('email')&&data.get('password')==u.password)

    if(user==null){
       nav('/SignUp')}
     else if(user.status==1){
      dispatch(saveUser(user))
      nav('/ManageCategory')
    
     }
    else {
      
       dispatch(saveUser(user))
       nav('/GetCategory')
       
    }
        
  };
  const u=useSelector((state: RootState) => state.UserSlice.user); 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'pink' }}>

            <LockOutlinedIcon style={{backgroundColor:'pink'}}/>
          </Avatar>
          <Typography component="h1" variant="h5"
          >
            Sign in
            
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField

              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              color='info'
              autoFocus
              style={{WebkitTextFillColor:'pink',
              WebkitColumnRuleColor:'pink'
              
            }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
             
            />
            <Button
            style={{backgroundColor:'pink'}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <>Don't have an account?</>
            <Button 
            style={{backgroundColor:'pink'}}
            onClick={()=>nav('/SignUp')}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }}/>
      </Container>
    </ThemeProvider>
  );
}