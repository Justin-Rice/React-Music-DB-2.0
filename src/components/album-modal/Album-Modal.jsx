import React, { useState } from "react";
import { useEffect, ueState } from "react";
import Tracklist from './Tracklist.jsx'
import tinycolor from "https://esm.sh/tinycolor2";

export default function AlbumModal(props){
  const [albumInfo, setAlbumInfo] = useState();
  const {colors} = props;
  


  // console.log(colors)
   

    const modalMain = tinycolor(colors[1])
    .setAlpha(1)
  .darken(65)
  .brighten(18)  
  // .saturate(15)
  .desaturate(25)
    
    const modalSecondary = tinycolor(colors[1])
    .setAlpha(1)
  .darken(10) 
  .saturate(15)
  .lighten()
    
  
  let darkerGradientStyle = {
    background: `linear-gradient(${modalMain + 'B3'}, ${modalSecondary + 'B3'})`,
    
}
let opaque = {
  background: `linear-gradient(${modalMain + 'FF'}, ${modalSecondary + 'FF'})`,
}
  //  console.log(colors.bgGradientStyle)
    let searchParams = {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : 'Bearer ' + props.accessToken
        }
      }

    useEffect(()=>{preloadAlbum(props.albumID)},[])

    async function preloadAlbum(albumID){
      setAlbumInfo({})
        await fetch('https://api.spotify.com/v1/albums/'+albumID, searchParams)
        .then(response=> response.json())
        .then(data => setAlbumInfo({...data}))
      }

        function handleOffClick(){
          setTimeout(()=>{
            props.setClicked(!props.clicked)

          },5000)
        }
        // console.log(albumInfo)
     //stops child element from firing onclick to close modal
      function handleChildElementClick(e){
        e.stopPropagation()
     }
     
    return(
         <div style={darkerGradientStyle} className={`album-modal ${props.isTrue ? 'fade' : 'hidden'}`}  onClick={()=>{handleOffClick}}>
          <div style={opaque} className={`album-modal-details ${props.isTrue ? 'slide' : 'hidden'}`} onClick={handleChildElementClick}>
            <div className="album-modal-top">
            <div className="album-modal-top-flex">
                <img src={albumInfo?.images?.[0]?.url} alt="" className="album-modal-artwork" />
                <div className="album-modal-title">{albumInfo?.name}</div>
            </div>
            <div className="album-modal-middle">
              <div className="album-modal-track-title"> <span id="track-number">#</span>Title</div>
              <div className="album-modal-runtime"><i className="fa fa-clock-o"></i></div>
            </div>
            </div>
            
            <div className="album-modal-bottom">
              <Tracklist
              gradient={darkerGradientStyle}
                tracks={albumInfo?.tracks?.items}
              />
            </div>
          </div>
        </div>
    
    );
}