import { Auth } from 'aws-amplify';
import React ,{useState,useEffect}from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {

const initialState = {
    email:'',
    username:'',
    password:'',
    authCode:'',
    formType:''
}


    const history = useHistory();
    const location =useLocation()
    const [user, updateUser] = useState(null)
    const [formState, updateFormState] = useState(initialState)
    const {formType} = formState;
    const {email} = formState
    useEffect(() => {
        updateFormState(()=>({...formState,formType:location.pathname}))
        checkUserStatus()
    }, [])
    async function checkUserStatus() {
      alert("check status")
        try{
            const user = await Auth.currentAuthenticatedUser();
            updateUser(user)
            history.push('/UserdashBoard')
        }catch(err){
          alert(location.pathname)
          updateFormState(()=>({...formState,formType:location.pathname}))
        }
    }
    function OnHandleChange(e){
        e.persist();
        updateFormState(()=>({...formState,[e.target.name]:e.target.value}))
   
    }
    async function SignUp(){
        const {password,email} = formState;
        const username = email;
        const user =await Auth.signUp({
            username,
            password,
            attributes: {
                email  },
            validationData: [],  // optional
            })
            .then(data => {
                updateFormState(()=>({...formState,formType:'ConfirmSignUp'}))
            })
            .catch(err => console.log(err));
    }
    async function ConfirmSignUp(){
        const {email,authCode} =formState;
        const user = await // After retrieveing the confirmation code from the user
        Auth.confirmSignUp(email, authCode, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        }).then(data => {
            updateFormState(()=>({...formState,formType:'/signIn'}))
        })
          .catch(err => console.log(err));
    }
    async function SignIn(){
        const {email,password} = formState;
        await Auth.signIn(email, password)
            .then(user => {
                history.push('/UserdashBoard')
            })
            .catch(err => console.log(err));
    }
    async function SignOut(){
        await Auth.signOut()
            .then(data => {
                    history.push('/signIn')
            })
            .catch(err => console.log(err));
    }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
  
        {
          formType === '/signUp' && (
            <>
                  <Typography component="h1" variant="h5">
          Sign up
        </Typography>
          <Grid container spacing={2}>
         
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              onChange={OnHandleChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              onChange={OnHandleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          onClick={SignUp}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/signIn" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        </>
          )
        }
         {
                    formType === 'ConfirmSignUp' && (
                       <>
                             <Typography component="h1" variant="h5">
                             Check Email for confirmation Code
        </Typography>
                     
                         <Grid container spacing={2}>
         
         <Grid item xs={12}>
           <TextField
             variant="outlined"
             required
             fullWidth
             disabled
            value={email}
             id="email"
           
             name="email"
             autoComplete="email"
           />
         </Grid>
         <Grid item xs={12}>
           <TextField
             variant="outlined"
             required
             fullWidth
             onChange={OnHandleChange}
             name="authCode"
             label="auth Code"
             
             id="password"
             
           />
         </Grid>
         <Grid item xs={12}>
           <FormControlLabel
             control={<Checkbox value="allowExtraEmails" color="primary" />}
             label="I want to receive inspiration, marketing promotions and updates via email."
           />
         </Grid>
       </Grid>
       <Button
         type="submit"
         fullWidth
         onClick={ConfirmSignUp}
         variant="contained"
         color="primary"
         className={classes.submit}
       >
       Confirm   Sign Up
       </Button>
       <Grid container justify="flex-end">
         <Grid item>
           <Link href="/signIn" variant="body2">
             Already have an account? Sign in
           </Link>
         </Grid>
       </Grid>
                       </>
                    )
                }
                {
                    formType === '/signIn' && (
                      <>
                                   <Typography component="h1" variant="h5">
                         SignIn
        </Typography>
                        <Grid container spacing={2}>
         
         <Grid item xs={12}>
           <TextField
             variant="outlined"
             required
             fullWidth
             onChange={OnHandleChange}
             id="email"
             label="Email Address"
             name="email"
             autoComplete="email"
           />
         </Grid>
         <Grid item xs={12}>
           <TextField
             variant="outlined"
             required
             fullWidth
             onChange={OnHandleChange}
             name="password"
             label="Password"
             type="password"
             id="password"
             autoComplete="current-password"
           />
         </Grid>
         <Grid item xs={12}>
           <FormControlLabel
             control={<Checkbox value="allowExtraEmails" color="primary" />}
             label="I want to receive inspiration, marketing promotions and updates via email."
           />
         </Grid>
       </Grid>
       <Button
         type="submit"
         fullWidth
         onClick={SignIn}
         variant="contained"
         color="primary"
         className={classes.submit}
       >
         Sign In
       </Button>
       <Grid container justify="flex-end">
         <Grid item>
           <Link href="/signIn" variant="body2">
             Already have an account? Sign in
           </Link>
         </Grid>
       </Grid>
                      </>
                      )
                }
        
      </div>
     
    </Container>
  );
}