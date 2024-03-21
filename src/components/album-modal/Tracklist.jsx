import "./Tracklist.scss"

export default function Tracklist(props){
const {tracks} = props
let output = []
    console.log(tracks)
    //converst ms to minutes and seconds
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
            console.log(trackLength)
            console.log(track.artists)
            console.log(featured)
            console.log(track.external_urls.spotify)

           return <div key={index} className="track">
                        <div className="track-info">
                          
                            <div className="track-name">    {explicit &&  <span class="material-symbols-outlined">explicit</span>} <a target='_blank'href={track.external_urls.spotify}>{name}</a> </div>
                            <div className="track-length">{trackLength} </div>
                          
                        </div>
                        {featured.map((artist, index)=>{
                            console.log(artist)
                            return (
                            <span className="track-artist"> 
                           
                                <a key={index} target="_blank" href={artist.link}>
                                    {artist.name}
                                </a> 
                            {(featured.length > 1) && (index != featured.length - 1 )? <span className="comma">,</span> : ''}
                            </span>
                            )
                        })}
                  </div>
            // track number 
            // console.log(index +1)
            console.log(track)

        })
    }
    </div>
)

}