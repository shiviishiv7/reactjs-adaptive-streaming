//import {  Grid } from '@material-ui/core';
//import React,{useState,useEffect} from 'react'
import React from 'react'

export default function UserSearchResult() {
  return (
    <div>
      
    </div>
  )
}


// import VideoCard from  './VideoCard';
// import gql from 'graphql-tag';

// import { listPosts } from '../graphql/queries';

// import client from '../aws-client';
// import { useParams } from 'react-router-dom';

// import {searchPosts} from '../graphql/queries'

// function Home(props) {
// const [setSearchPost, setSetSearchPost] = useState([])
//  const {title} =  useParams()
  
//   useEffect(() => {
      
//     async function fetchData(){
//         client.query({
//           query: gql(searchPosts),
//           variables:{
//               title:title
//           }
//         }).then(res=>{
//           setSetSearchPost(res.data.searchPosts.items)
//            // setVideoPost(res)
//             //setVideoState(true)
//         }).catch(e=>{
//             console.log(e)
//         });
//                   }
                  
//     fetchData()  

//   }, [])

  

//   return (
//     <div>
      
//       <Grid container spacing={10} style={{padding:'24px'}}>
//       {setSearchPost.map(user=>

// <Grid key={user.id}item xs={12} sm={6} md={4} lg={4} xl={3}>
//         <VideoCard key={user.id} user={user}/>

// </Grid>
//       )}
//       </Grid>
//     </div>
//   )
// }

// export default Home
