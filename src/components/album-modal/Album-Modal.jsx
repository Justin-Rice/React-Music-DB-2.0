import React, { useState } from "react";
import { useEffect, ueState } from "react";
import Tracklist from './Tracklist.jsx'

export default function AlbumModal(props){
  const [albumInfo, setAlbumInfo] = useState();

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
      // setTimeout(() => {
      //     console.log(albumInfo?.tracks)
      // }, 300);
    

        function handleOffClick(){
          setTimeout(()=>{
            props.setClicked(!props.clicked)

          },5000)
        }
        console.log(albumInfo)
     //stops child element from firing onclick to close modal
      function handleChildElementClick(e){
        e.stopPropagation()
     }
     
    return(
         <div className={`album-modal ${props.isTrue ? 'fade' : 'hidden'}`}  onClick={()=>{handleOffClick}}>
          <div  className={`album-modal-details ${props.isTrue ? 'slide' : 'hidden'}`} onClick={handleChildElementClick}>
            <div className="album-modal-top">
            <div className="album-modal-top-flex">
                <img src={albumInfo?.images?.[0]?.url} alt="" className="album-modal-artwork" />
                <div className="album-modal-title">{albumInfo?.name}</div>
            </div>
            <div className="album-modal-middle">
              <div className="album-modal-title"> <span id="track-number">#</span>Title</div>
              <div className="album-modal-runtime"><i class="fa fa-clock-o"></i></div>
            </div>
            </div>
            
            <div className="album-modal-bottom">
              <Tracklist
                tracks={albumInfo?.tracks?.items}
              />
            </div>
          </div>
        </div>
    
    );
}