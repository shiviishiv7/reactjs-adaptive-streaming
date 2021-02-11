import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {getPost} from '../graphql/queries';
import gql from 'graphql-tag';
import client from '../aws-client';

import ShakaPlayer from 'shaka-player-react'

function Watch() {
    const {id} = useParams();
    const [videoPost, setVideoPost] = useState([])
    const [videoState, setVideoState] = useState(false)
    useEffect(() => {
        // async function fetchData(){
          
        //   await API.graphql({ query: getPost, variables: { id: `${id}` }})
        //   .then(res=>{
        //     setVideoPost(res.data.getPost)
        //     console.log(res.data.getPost)
        //      setVideoState(true)
        //   }).catch(e=>{
        //       console.log(e)
        //   })
          
        // }
        // fetchData()

       
            
            async function fetchData(){
                
client.query({
    query: gql(getPost),
    variables:{
        id:id
    }
  }).then(res=>{
      setVideoPost(res.data.getPost)
      setVideoState(true)
  }).catch(e=>{
      console.log(e)
  });
            }
            fetchData()
        
         
      },[] )
    
    const history = useHistory();
    return (
        <div>
            {
                videoState && (<>
                   <Button variant="contained" onClick={e=>history.goBack()}>goBack</Button>
                    <ShakaPlayer autoPlay src={videoPost.videoUrl} heignt={400} width={400} />
                    </>
                )
            }
            {
                    !videoState && (
                        <>try next time
                        <Button variant="contained" onClick={e=>history.goBack()}>goBack</Button>
                        </>
                    )
            }
       
        </div>
    )
}

export default Watch
