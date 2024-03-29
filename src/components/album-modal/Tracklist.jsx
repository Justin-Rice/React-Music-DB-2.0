import "./Tracklist.scss"

export default function Tracklist(props){
const {tracks} = props;
let output = [];
    // console.log(tracks);
    // console.log(props.gradient)
    //converts ms to minutes and seconds
    function msConverter(ms){
        var mins = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        // return mins + ":" + (seconds < 10 ? '0' : '') + seconds;
        return (
            seconds == 60 ?
            (mins+1) + ":00" :
            mins + ":" + (seconds < 10 ? "0" : "") + seconds
          );

    }
    // cleans artist data to grab artist name and link to spotify page
    function artistCleaner(artists){
         output = []
        
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
            // console.log(trackLength)
            // console.log(track.artists)
            // console.log(featured)
            // console.log(track.external_urls.spotify)

           return <div key={index} className="track">
                    <div className="track-info"> 
                    <span className="track-number">{index + 1}.</span> 
                        <div className="track-name">   
                            {explicit &&  
                            <span className="material-symbols-outlined">explicit</span>
                            } <a target='_blank'href={track.external_urls.spotify}>
                              {name}
                             </a> 
                        </div>
                        <div className="track-length">
                            {trackLength}
                         </div>
                    </div>
                    <div className="track-artist-container">
                    {featured.map((artist, index)=>{
                        // console.log(artist)

                        return (
                        <span className="track-artist"> 
                            <a key={index} target="_blank" href={artist.link}>
                                {artist.name += (featured.length > 1) && (index != featured.length - 1 )? ", " :  '' }
                            </a> 
                        </span>
                        )
                    })}
                    </div>
                  </div>
            // track number 
            // console.log(index +1)
            // console.log(track)

        })
        }
    </div>
)

}