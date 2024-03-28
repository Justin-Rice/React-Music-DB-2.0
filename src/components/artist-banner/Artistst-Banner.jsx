import "./artist-banner.scss";
 import Preload from '../preload/Preload';
import {useState} from 'react';

import { ColorExtractor } from 'react-color-extractor';
import tinycolor from "https://esm.sh/tinycolor2";

export default function ArtistBanner(props){
    const [imgColors, setImgColors] = useState();    
    const {artistInfo} = props;
    // console.log(artistInfo)

    let mainColor = tinycolor(imgColors?.[1])
    .setAlpha(1)
    .darken(25)
    .brighten(5)  
    .saturate(5)
let secondaryColor = tinycolor(imgColors?.[1])
    .setAlpha(1)
    .darken(10) 
    .lighten()


    const bgGradientStyle = {
      background: `linear-gradient(${mainColor}A1, ${secondaryColor}A1)`
  
  }
    return (
    <>
        {artistInfo !='' ?  
        <div className="artist-banner"style={bgGradientStyle} >
            <div className="artist-info">
                { props.accessToken &&
                  <a href={artistInfo[4]} target="_blank">
                    <ColorExtractor getColors={colors => setImgColors(colors)}>
                       <img className='artist-image' src={artistInfo[1]} alt={artistInfo[1]}  />
                    </ColorExtractor>
                  </a>
                }
                <div className="info">
                    <div className="artist-name">{artistInfo[0]}</div>  
                    {
                    artistInfo?.[2].length >= 1 && <div id="genre">{artistInfo?.[2].length <=1 ? 'Genre:' : 'Genres:' }
                        <div className="artist-genres"> 
                            {artistInfo?.[2]?.map((genre, key)=>{
                            return (<span className='artist-genre' key={key}> {genre} </span> )
                            })}
                        </div> 
                    </div>
                    }
                </div>
           </div>
        </div>
        : 
         <Preload/>
        }
    </>
)

}