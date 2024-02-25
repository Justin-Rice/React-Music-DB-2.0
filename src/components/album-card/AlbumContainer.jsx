import '../../styles/Album.css'
import AlbumCard  from './AlbumCard'


export default function AlbumContainer(props){
    const {artistData, albumData} = props;
    //  setTimeout(()=>{console.log(artistData.images[0].url)},5000)
    // <img src={artistData.images[0].url} alt="text"  />
    // console.log(props.artistData[2])
    return (<>
    <div className="artist-banner">
            <div className="text">{artistData[0]}</div>  
            {/* <div className="artist-genre">{artistData[2].map((genre, key)=>{
                <span key={key}>{genre} </span>
            })}</div> */}
           < img className='artist-image' src={props.artistData[1]} alt="text"  />
    </div>
        <div className='album-container'>
            
           { albumData.map((album, key)=>{
            // console.log(check)
           return <AlbumCard key={key} albumData={album}></AlbumCard>

           })
           
           }
        </div>
        </>)
}