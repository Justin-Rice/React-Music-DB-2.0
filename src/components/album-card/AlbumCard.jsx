import { useEffect } from 'react';
import '../../styles/Album.css';

const CLIENT_ID = 'e2abc18b0bc147169ee86e768770d4bd';
const CLIENT_SECRET = '12f45773864e4d46a6ab5452d9223f30';

export default function AlbumCard(props){
    const {name, images} = props.albumData;
    // let shortName = '' {name.length >= 35 ? name = name +'...' : name }
    // console.log(name)
    //    console.log(props.albumData);
    return (
        <div className='album-card' albumid={props.albumData.id} >
            <img className='card-image'src={props.albumData.images[1].url} alt=""  />
            <div className="card-content">
                <div className="card-title">{name}</div>
                <div className="card-release-date"></div>
                <div className="card-rating"></div>
            </div>
        </div>
    )
}