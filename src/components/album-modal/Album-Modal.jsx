import React, { useState } from "react";
import { useEffect, ueState } from "react";
export default function AlbumModal(props){
  const [albumInfo, setAlbumInfo] = useState();
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
      setAlbumInfo({})
        await fetch('https://api.spotify.com/v1/albums/'+albumID, searchParams)
        .then(response=> response.json())
        .then(data => setAlbumInfo({...data}))
      
      }
      console.log(albumInfo)

      //stops child element from firing onclick to close modal
      const handleChildElementClick = (e) => {
        e.stopPropagation()
        // Do other stuff here
     }

    return(
        <div onClick={()=>props.setClicked(!props.clicked)} className='album-modal'>
          <div onClick={handleChildElementClick} className="album-modal-details">
           <div className="album-modal-top">
              <img src={albumInfo?.images?.[0]?.url} alt="" className="album-modal-artwork" />
              <div className="album-modal-title">{albumInfo?.name}</div>
           </div>
           <div className="album-modal-bottom"></div>
          </div>
        </div>
    );
}