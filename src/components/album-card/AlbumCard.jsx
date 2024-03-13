
import '../album-modal/Album-Modal.scss';
import './Album-Card.scss';
import AlbumModal from '../album-modal/Album-Modal';
import { useState } from "react";
export default function AlbumCard(props){

    const [clicked, setClicked ] = useState(false);
    const {name, images} = props.albumData;
    // if value is true add fade class ot element which causes fade animation to play
    const [isTrue, setIsTrue] = useState(true)
    // console.log(props)
   
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
        <div onClick={handleAlbumClick}>
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
               
                <img className='card-image'src={props.albumData.images[1].url} alt="" />
                <div className="card-content">
                    <div className="card-title">{name}</div>
                    <div className="card-release-date"></div>
                    <div className="card-rating"></div>
                </div>
            </div>
        </div>
    )
}