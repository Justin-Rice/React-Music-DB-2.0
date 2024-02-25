import React from "react";
import { useEffect } from "react";
export default function AlbumModal(props){
    let searchParams = {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : 'Bearer ' + props.accessToken
        }
    
      }
      console.log(props)
     useEffect(()=>{preloadAlbum(props.albumID)},[])

    async function preloadAlbum(albumID){

        await fetch('https://api.spotify.com/v1/albums/'+albumID, searchParams)
        .then(response=> response.json())
        .then(data => console.log(data))
      
      }

    

    return(
        <div onClick={()=>props.setClicked(!props.clicked)} className='album-modal'></div>
    );
}