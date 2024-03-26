
import '../album-modal/Album-Modal.scss';
import './Album-Card.scss';
import AlbumModal from '../album-modal/Album-Modal';
import { useState } from "react";
import { ColorExtractor } from 'react-color-extractor';
import tinycolor from "https://esm.sh/tinycolor2";
export default function AlbumCard(props){

    const [clicked, setClicked ] = useState(false);
    const [imgColors, setImgColors] = useState();    
    const {name, images} = props.albumData;
    // console.log(imgColors?.[0])
    // if value is true add fade class ot element which causes fade animation to play
    const [isTrue, setIsTrue] = useState(true)
    // console.log(props)
   
let mainColor = tinycolor(imgColors?.[1])
 .setAlpha(1)
 .darken(25)
 .brighten(5)  
 .saturate(5)
 let secondaryColor = tinycolor(imgColors?.[1])
 .setAlpha(1)
 .darken(10) 
 .lighten()
 
 
 let textColor = '#FFF'
//  tinycolor(imgColors?.[0]).complement().darken(60).setAlpha(0.8).desaturate(20)
//  .darken(80)  
//  .desaturate(0);

const bgGradientStyle = {
    background: `linear-gradient(${mainColor}F0, ${secondaryColor}F0)`

}

const textGradientStyle = {
    color: textColor,
    // 'text-decoration': "underline " + secondaryColor.darken(45) + " 3px"

}


    function handleAlbumClick(){
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
                colors={{mainColor, secondaryColor}}
            />
            }
            <div className='album-card' albumid={props.albumData.id}  >
            <ColorExtractor getColors={colors => setImgColors(colors)}>
                <img className='card-image'src={props.albumData.images[1].url} alt="" />
            </ColorExtractor>
                <div className="card-content">
                    <div className="card-title" style={textGradientStyle}>{name}</div>
                    <div className="card-release-date"></div>
                    <div className="card-rating"></div>
                </div>
            </div>
        </div>
    )
}