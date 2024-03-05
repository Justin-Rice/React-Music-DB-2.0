import React, { useState } from "react";
import { useEffect, ueState } from "react";

export default function AlbumModal(props){
  const [albumInfo, setAlbumInfo] = useState();
  const [isEnter, setIsEnter] = useState(true)

    let searchParams = {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : 'Bearer ' + props.accessToken
        }
      }

      // console.log(props)
    useEffect(()=>{preloadAlbum(props.albumID)},[])

    async function preloadAlbum(albumID){
      setAlbumInfo({})
        await fetch('https://api.spotify.com/v1/albums/'+albumID, searchParams)
        .then(response=> response.json())
        .then(data => setAlbumInfo({...data}))
      
      }
      console.log(albumInfo)

        function handleOffClick(){
          setTimeout(()=>{
            props.setClicked(!props.clicked)

          },5000)
        }
     
        //stops child element from firing onclick to close modal
      function handleChildElementClick(e){
        e.stopPropagation()
     }
     
    return(
        <div className={`album-modal ${props.isTrue ? 'fade' : 'hidden'}`}  onClick={()=>{handleOffClick}}>
          <div  className={`album-modal-details `} onClick={handleChildElementClick}>
           <div className="album-modal-top">
              <img src={albumInfo?.images?.[0]?.url} alt="" className="album-modal-artwork" />
              <div className="album-modal-title">{albumInfo?.name}</div>
           </div>
           <div className="album-modal-bottom"></div>
          </div>
        </div>
    
    );
}