import React,{useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CloudUpload } from '@material-ui/icons';

import { API,Auth,graphqlOperation,Storage } from 'aws-amplify';
import { createPost } from '../graphql/mutations';

import { v4 as uuidv4 } from 'uuid';
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


 const initialState = {
     title:'title',
     description:'desc',
     imageUrl:'image',
     videoUrl:'video'
 }

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SignUp() {
  const history = useHistory();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        
      })     
      .catch(err =>{alert("please login to upload a video");history.push('/')} )
  }, [])
  const classes = useStyles()
  const [initialUrl, setInitialUrl] = useState({preVideoUrl:'',preImageUrl:''})
    
     const [post, setpost] = useState(initialState)
     const [updateState, setUpdateState] = useState({formType:"video"})
     console.log(updateState)
     function OnHandleChange(e){
         e.persist();
         setpost(()=>({...post,[e.target.name]:e.target.value}))
         
     }
     const [open, setOpen] = React.useState(false);
     const handleClose = () => {
       setOpen(false);
     };
     const handleToggle = () => {
       setOpen(true);
     };
 
  async   function  OnHandleSubmit() {
  //   const todo = { name: "My first todo", description: "Hello world!" };
     await API.graphql(graphqlOperation(createPost, {input: post}))
     .then(res=>{
         console.log(res)
         setUpdateState({formType:"uploaded"})
         alert("file uploaded , check your dashboad for url link")
     }).catch(e=>{
         alert(e)
     })
     
         console.log(post)
     }
   async function  onChangeVideo(e) {
         const file = e.target.files[0];
         ///check length of the file
         const vUrl = uuidv4(); 
         console.log(vUrl)
         
        const v ="https://testingvideo-dev-output-w0cqb334.s3.ap-south-1.amazonaws.com/public/"+vUrl+"/"+vUrl+".mpd";
        setpost(()=>({...post,videoUrl:v}))
         const filename = vUrl+".mp4";
         setInitialUrl(()=>({...initialUrl,preVideoUrl:filename}))
         handleToggle()
         Storage.put(filename, file, {
             bucket:"testingvideo-dev-input-w0cqb334",
             contentType: 'video/mp4'
         },{
           progressCallback(progress) {
             console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
       },
         })
         .then (result => {
                 console.log(result)
                 setUpdateState({formType:"image"})
               //  updateFormState(()=>({...formState,formType:'/signIn'}) 
               // update video url
         })
         .catch(err => alert(err));
         handleClose()
     }
  async function   onChangeImage(e) {
         const file = e.target.files[0];
         const IUrl = uuidv4(); 
         console.log(IUrl)
       
         const filename = IUrl+".jpg";
         setInitialUrl(()=>({...initialUrl,preImageUrl:filename}))
         const v ="https://testingproject23923e3775172401b8aafc4833ecb006c93322-dev.s3.ap-south-1.amazonaws.com/public/"+IUrl+".jpg";
         setpost(()=>({...post,imageUrl:v}))
         handleToggle()
         Storage.put(filename, file, {
    //         bucket:aws_user_files_s3_bucket,
      //       region:aws_user_files_s3_bucket_region,
             contentType: 'image/jpg'
         })
         .then (result => {
             setUpdateState({formType:"title"})
             console.log(result)
                //  updateFormState(()=>({...formState,formType:'/signIn'}) 
               // update image url
         })
         .catch(err => alert(err));
         handleClose()
     }
     
   

  return (
   <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CloudUpload />
        </Avatar>
        <Typography component="h1" variant="h5">
          Upload Video
        </Typography>
        
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button  variant="contained"   component="label" >  Upload video   <input    type="file" accept='video/mp4' hidden onChange={(evt) => onChangeVideo(evt)}  /></Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button   variant="contained"   component="label" >  Upload thumbnail   <input  type="file" accept='image/jpg'
              onChange={(evt) => onChangeImage(evt)}     hidden   /></Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={OnHandleChange}
                fullWidth
                id="title"
                label="title of video"
                name="title"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={OnHandleChange}   variant="outlined"    required    fullWidth    name="description"    label="description of video"   type="text"
                
              />
            </Grid>
          
          </Grid>
          <Button    fullWidth    variant="contained"  color="primary" onClick={OnHandleSubmit}    className={classes.submit}  > Submit  </Button>
        
      </div>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
