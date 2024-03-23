
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
    console.log(imgColors?.[0])
    // if value is true add fade class ot element which causes fade animation to play
    const [isTrue, setIsTrue] = useState(true)
    // console.log(props)
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 0.5
        } : null;
      }
    //   let originColor = tinycolor(imgColors?.[0]);
    //   console.log(originColor)
    //   let darkerColor = originColor.brighten(25).toString;
    //   console.log(tinycolor(imgColors?.[0]).darken(10))
//    console.log(albumStyle.backgroundColor)

    function handleAlbumClick(){
        //if true instantly change both values
        if(isTrue){
             setClicked(!clicked)
            setIsTrue(!isTrue)
            document.body.style.overflow = "hidden"  
            // document.body.style.backdropFilter = 'blur(10px)'
              }else{
        //else add fade class then change clicked value after 400ms animation plays
        setIsTrue(!isTrue)
        document.body.style.overflow = "visible"  

        setTimeout(()=>{
         setClicked(!clicked)
        

        },450)
    }
    }
    return (
        <div onClick={handleAlbumClick} style={{   
            // TODO: add linear gradietns with combo of two image color values  
            backgroundColor: tinycolor(imgColors?.[0])
            .setAlpha(0.7)
            .darken(10)  
            .desaturate(40)
        }}>
            {clicked && 
            <AlbumModal 
                albumID={props.albumData.id} 
                accessToken={props.accessToken} 
                setClicked={setClicked} 
                clicked={clicked}
                isTrue={isTrue}
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