import React, { useEffect, useState } from 'react'
import {Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import {todosByOwner} from '../graphql/queries';
import { API,graphqlOperation } from 'aws-amplify';
import VideoCard from '../GeneralComp/VideoCard';
import { Grid } from '@material-ui/core';


function UserdashBoard() {

    const history = useHistory()
    const [userid, setUserid] = useState('')
    const [post, setPost] = useState([])
    useEffect(() => {
        async function authcheck(){
          await  Auth.currentAuthenticatedUser()
              .then(user => {
                
              })     
              .catch(err =>{alert("please login to upload a video");history.push('/')} )
            }  
            authcheck();
    async function fetchUserid(){
        await Auth.currentAuthenticatedUser()
            .then(user => {
              //  console.log(user)
                setUserid(user.username)
                console.log(userid)
            })
            
            .catch(err => console.log('err',err));
            //console.log(userid)
    } 
    fetchUserid()   
    async function fetchData(){
     //   await API.graphql(graphqlOperation(todosByOwner, { input: { id: userid,limit:10, sortDirection: 'DESC', }}))
        await API.graphql(
            graphqlOperation(todosByOwner, {
              owner: userid,
            
              limit: 100
    }))
            .then(res=>setPost(res.data.todosByOwner.items))
            .catch(e=>console.log(e))
    }
        fetchData()
    }, [])
   
    return (
        <div>
              
                <Grid container spacing={10} style={{padding:'24px'}}>
      {post.map(user=>

<Grid key={user.id}item xs={12} sm={6} md={4} lg={4} xl={3}>
        <VideoCard key={user.id} user={user}/>

</Grid>
      )}
      </Grid>
           
        </div>
    )
}

export default UserdashBoard
