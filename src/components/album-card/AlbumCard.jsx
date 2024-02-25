import '../../styles/Album.css';
import '../../styles/Album-Modal.css';
import AlbumModal from '../album-modal/Album-Modal';
import { useState} from 'react';

export default function AlbumCard(props){
    const [clicked, setClicked ] = useState(false);
    const {name, images} = props.albumData;


    
    // let shortName = '' {name.length >= 35 ? name = name +'...' : name }
    // console.log(name)
        //  console.log(props.albumData.id);
    return (
        <div onClick={()=>setClicked(!clicked)}>
        {clicked && <AlbumModal albumID={props.albumData.id} accessToken={props.accessToken} setClicked={setClicked} clicked={clicked}/>}
        <div className='album-card' albumid={props.albumData.id} >
            <img className='card-image'src={props.albumData.images[1].url} alt=""  />
            <div className="card-content">
                <div className="card-title">{name}</div>
                <div className="card-release-date"></div>
                <div className="card-rating"></div>
            </div>
        </div>
        </div>
    )
}