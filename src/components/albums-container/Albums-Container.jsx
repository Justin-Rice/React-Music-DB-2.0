import AlbumCard from "../album-card/AlbumCard";


export default function AlbumsContainer(props){
    const {albumData, musicType, accessToken} = props;
    let yearGroup = '';
    let timer = 1000;

    const animation = {
        animation: `slidenfade ${timer+100}ms forwards`
    }

    return(
        <div className="album-container" key=''>
            { albumData != '' && 
                <div className="music-type">  
                    {(musicType < 1 ? musicType : musicType +'s')} 
                </div>
            }
            {
            Object
            .entries(albumData)
            .slice(0)
            .reverse()
            .map(([year, albums])=>{
                yearGroup = (<div key={year}>
                    <span className="album-year" style={animation} >{year}</span> 
                    <div className="album-years-container" > 
                        {albums.map((album, key)=> {
                             timer += 100;
                        return ( 
                            <AlbumCard
                                renderTimer={timer}
                                onModalLoad={props.onModalLoad}
                                accessToken={accessToken}
                                albumData={album}
                                key={key}
                            />
                        )})}
                    </div>
                </div> 
                )
            return  yearGroup
            })
            }
        </div>
    )
}