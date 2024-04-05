import "./Tracklist.scss"

export default function Tracklist(props){
const {tracks} = props;
let output = [];
    

    function msConverter(ms){
        var mins = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
            (mins+1) + ":00" :
            mins + ":" + (seconds < 10 ? "0" : "") + seconds
          );

    }

    // cleans artist data to grab artist name and link to spotify page
    function artistCleaner(artists){
         output = [];
            artists.forEach((artist)=>{
                let link = artist.external_urls.spotify
            
                let artistData = {
                    name: artist.name,
                    link: link
                }
                 output.push(artistData)
            })
        return output
    }

return (
    <div className="tracklist">
        {
        tracks?.map((track, index)=>{
            //track name | explicit status | duration in minutes seconds
            const name = track.name;
            const explicit = track.explicit;
            const featured  = artistCleaner(track?.artists)
            const trackLength = msConverter(track.duration_ms);
        
           return <div key={index} className="track">
                    <div className="track-info"> 
                    <span className="track-number">{index + 1}.</span> 
                        <div className="track-name">   
                        <a target='_blank'href={track.external_urls.spotify}>
                              {name}
                             </a> 
                            {explicit &&  
                            <span className="material-symbols-outlined">explicit</span>
                            } 
                        </div>
                        <div className="track-length">
                            {trackLength}
                         </div>
                    </div>
                    <div className="track-artist-container">
                    {featured.map((artist, index)=>{

                        return (
                        <span key={index} className="track-artist"> 
                            <a target="_blank" href={artist.link}>
                                {artist.name += (featured.length > 1) && (index != featured.length - 1 )? ", " :  '' }
                            </a> 
                        </span>
                        )
                    })}
                    </div>
                  </div>

        })
        }
    </div>
)

}