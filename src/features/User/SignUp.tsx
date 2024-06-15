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
import createUser, { postUser, saveUser } from "../User/UserSlice";
import User from "../../models/User"
import { useState } from 'react';
import { isValidElement } from 'react';
import { error } from 'console';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '../../app/store';
import Swal from "sweetalert2";

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


function isValidEmail(email: any) {
  return /^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+@([-0-9A-Z]+\.)+([0-9A-Z]){2,4}$/i.test(email);
}

function isValidPassword(password: string) {
 
  return password.length>7 &&  password.length<10 && password.matchAll(/^[A-Za-z0-9]*$/) ;
}

function isValidPone(phone: string) {
  return phone.length==10 && phone.matchAll(/^[0-9]*$/) ;
}

function phoneTz(tz: string) {
  return tz.length==9 && tz.matchAll(/^[0-9]*$/) ;
}

function phoneName(str:string){
   return str.length!=0
}


function isValidTz(tz:string){
 return tz.length==9;
}
const theme = createTheme();
export default function SignUp() {
  // const dispatch:AppDispatch=useDispatch()
  // const nav=useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [tz,setTz]=useState("");
  // const id=0;
  const dispatch: AppDispatch = useDispatch();
  const nav=useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  //  if(!isValidEmail(data.get('email')?.toString))
  //  {
  //   Swal.fire({
  //     title: 'כתובת מייל לא חוקית',
  //     showConfirmButton: true,
  //     confirmButtonText: "OK",
  //     icon: 'warning'})
  //  }
  //  else
  //  {
    const user:User={
      email: data.get('email')?.toString(),
      firstName: data.get('firstName')?.toString(),
      lastName: data.get('lastName')?.toString(),
      password: data.get('password')?.toString(),
      phone:data.get('phone')?.toString(),
      tz: data.get('tz')?.toString(),
      status:0
    }
    
      dispatch(postUser(user));
      dispatch(saveUser(user))
      nav('/GetCategory');
  // }
    }
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  // value={firstName}
                  // helperText={firstName===""?"required":""}
                  // onChange={(e)=>{
                  //   setFirstName(e.target.value)
                  // }} 
                    
                  style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  type="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  // value={lastName}
                  // helperText={lastName===""?"required":""}
                  // onChange={(e)=>{
                  //   if(isValidEmail(e.target.value))
                  //     setEmail(e.target.value) 
                  //  InputProps={{ inputProps: { style: { color: '#fff' }}}}
                  //  }}
                  // onChange={(e)=>{
                  //   setLastName(e.target.value)
                  // }} 
                   style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  // value={email}
                  // helperText={email===""?"required":""}
                  // onChange={(e)=>{ 
                  //     setEmail(e.target.value)
                // }}
                style={{WebkitTextFillColor:'pink',
                WebkitColumnRuleColor:'pink'
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}
                  // value={password}
                  // helperText={password===""?"required":""}
                  // onChange={(e)=>setPassword(e.target.value)}
                  // style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}
                />
                
              </Grid>
              <Grid item xs={12} sm={6}>
            
                <TextField
                 required
                 fullWidth
                  autoComplete="given-name"
                  name="phone"
                  id="phone"
                  type="phone"
                  label="phone Number"
                  autoFocus
                  style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}
                  // value={phone}
                  // helperText={phone===""?"required":""}
                  // onChange={(e)=>setPhone(e.target.value)}
                  // style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="tz"
                  required
                  fullWidth
                  id="tz"
                  label="identity number"
                  autoFocus
                  // value={tz}
                  // helperText={tz===""?"required":""}
                  // onChange={(e)=>setTz(e.target.value)}
                  style={{WebkitTextFillColor:'pink',WebkitColumnRuleColor:'pink'}}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="default" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button 
            style={{backgroundColor:'pink'}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );};
              