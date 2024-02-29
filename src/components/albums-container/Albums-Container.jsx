import AlbumCard from "../album-card/AlbumCard";

export default function AlbumsContainer(props){
    let yearGroup = '';

    return(
        <div className="album-container">
        {Object.entries(props.albumData).slice(0).reverse().map(([year, albums])=>{
              yearGroup = (
             <div className="album-years-container" key={year}> 
                <span className="album-year" >{year}</span>
                {albums.map((album, key)=> {
                return ( 
                    <div className="outer" key={key}>
                        <AlbumCard
                            accessToken={props.accessToken}
                            albumData={album}
                            key={key}
                        />
                    </div>
                )})}
            </div>
            )
         return  yearGroup
        })}
        </div>
    )
}