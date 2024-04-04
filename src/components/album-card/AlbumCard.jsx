
import '../album-modal/Album-Modal.scss';
import './Album-Card.scss';
import AlbumModal from '../album-modal/Album-Modal';
import { useState, useEffect } from "react";
import { ColorExtractor } from 'react-color-extractor';
import tinycolor from "https://esm.sh/tinycolor2";
export default function AlbumCard(props){
    const [clicked, setClicked ] = useState(false);
    const [imgColors, setImgColors] = useState();    
    const {name, images} = props.albumData;
    const [isTrue, setIsTrue] = useState(true);
   
    let mainColor = tinycolor(imgColors?.[1])
    .setAlpha(1)
    .darken(25)
    .brighten(5)  
    .saturate(5);
    let secondaryColor = tinycolor(imgColors?.[1])
    .setAlpha(1)
    .darken(10) 
    .lighten();
 
    
    
    const bgGradientStyle = {
        background: `linear-gradient(${mainColor}F0, ${secondaryColor}F0)`,
        borderRadius: "10px",
         animation: `slidenfade ${props.renderTimer}ms`

    }

  


    function handleAlbumClick(){
        props.onModalLoad();
        //if true instantly change both values
        if(isTrue){
            setIsTrue(!isTrue)
            setClicked(!clicked)
            document.body.style.overflow = "hidden"  
           
        }else{
        //else add fade class then change clicked value after 400ms animation plays
            setIsTrue(!isTrue)
            document.body.style.overflow = "visible"  

            setTimeout(()=>{
                setClicked(!clicked)
            },650)
        }
    }
    return (
      
        <div onClick={handleAlbumClick} style={bgGradientStyle}>
            {clicked && 
            <AlbumModal 
                albumID={props.albumData.id} 
                accessToken={props.accessToken} 
                setClicked={setClicked} 
                clicked={clicked}
                isTrue={isTrue}
                colors={imgColors}
            />
            }
            <div className='album-card' albumid={props.albumData.id}  >
            <ColorExtractor getColors={colors => setImgColors(colors)}>
                <img className='card-image'src={props.albumData.images[1].url} alt="" />
            </ColorExtractor>
                <div className="card-content">
                    <div className="card-title">{name}</div>
                    <div className="card-release-date"></div>
                    <div className="card-rating"></div>
                </div>
            </div>
        </div>
    )
}