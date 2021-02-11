import {  Grid } from '@material-ui/core';
import React,{useState,useEffect} from 'react'


import VideoCard from  './VideoCard';
import gql from 'graphql-tag';

import { listPosts } from '../graphql/queries';

import client from '../aws-client';


function Home() {
  const [user,setUser] =useState([]);
  

  useEffect(() => {
    async function fetchData(){
      client.query({
        query: gql(listPosts)
      }).then(({ data: { listPosts } }) => {
        setUser(listPosts.items)
        console.log(listPosts.items);
      });
      
    }
    fetchData()
  },[] )

  return (
    <div>
      
      <Grid container spacing={10} style={{padding:'24px'}}>
      {user.map(user=>

<Grid key={user.id}item xs={12} sm={6} md={4} lg={4} xl={3}>
        <VideoCard key={user.id} user={user}/>

</Grid>
      )}
      </Grid>
    </div>
  )
}

export default Home
