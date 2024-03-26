import AlbumCard from "../album-card/AlbumCard";

export default function AlbumsContainer(props){
    const {albumData, musicType, accessToken} = props;
    let yearGroup = '';
    console.log(albumData)
    return(
        <div className="album-container" key=''>
         { albumData != '' && 
            <div className="music-type">  
             {(musicType < 1 ? musicType : musicType +'s')} 
            </div>
         }
        {Object.entries(albumData).slice(0).reverse().map(([year, albums])=>{
              yearGroup = (<div key={year}>
                <span className="album-year" >{year}</span> 
             <div className="album-years-container" > 
                {albums.map((album, key)=> {
                return ( 
                    <div className="outer" key={key}>
                        <AlbumCard
                            accessToken={accessToken}
                            albumData={album}
                            key={key}
                        />
                    </div>
                )})}
            </div>
            </div> )
         return  yearGroup
        })}
        </div>
    )
}