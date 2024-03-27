import '../components/albums-container/Albums-Container.scss';
import AlbumsContainer from './albums-container/Albums-Container';
import {useState} from 'react';
import NavBar from './navbar/NavBar';
import { ColorExtractor } from 'react-color-extractor';
import tinycolor from "https://esm.sh/tinycolor2";



export default function HomeContainer(props){
    //state 
    const [artistInfo, setArtistInfo] = useState([]);
    const [albumsInYears, setAlbumsInYears] = useState();
    const [singlesInYears, setSinglesInYears] = useState([]);
    const [searchClass, setSearchClass] = useState('search-bar-small');
    const [imgColors, setImgColors] = useState();    

    const [searchText, setSearchText] = useState('');
    let searchParams = {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : 'Bearer ' + props.accessToken
        }
    
      }
      console.log(imgColors)

      let mainColor = tinycolor(imgColors?.[1])
      .setAlpha(1)
      .darken(25)
      .brighten(5)  
      .saturate(5)
 let secondaryColor = tinycolor(imgColors?.[1])
      .setAlpha(1)
      .darken(10) 
      .lighten()


      const bgGradientStyle = {
        background: `linear-gradient(${mainColor}A1, ${secondaryColor}A1)`
    
    }
    
    //async function that populates page based on random artist in array  NOT ACTIVE
    async function preload(defaultArtists){
      randomArtist = defaultArtists[Math.floor(Math.random()*defaultArtists.length)]
        let artistID = await fetch('https://api.spotify.com/v1/search?q=' +randomArtist +'&type=artist' , searchParams)
        .then(response=> response.json())
        .then(data => {
            console.log(data)
          // variable that contains artist name, image, and genres 
         let artistBundle = [data.artists.items[0].name, data.artists.items[0].images[0].url,[...data.artists.items[0].genres]]
            console.log(artistBundle);
          setArtistInfo( [...artistBundle])
          console.log(artistInfo)
          return data.artists.items[0].id})
      //get request with artist ID grab all albums from artist 
    
      // display those albums to user
        await fetch('https://api.spotify.com/v1/artists/'+artistID +'/albums'+'?include_groups=album&market=US&limit=30',searchParams)
       .then(response=> response.json())
       .then(data => {
         console.log(data)
        setAlbums([...data.items])})
      }

      function handleSearchText(e){
        setSearchText(e.target.value);
        // console.log(searchText)
      }
      function handleMouseLeave(){
       if(searchClass == 'search-bar-large' && searchText == 0) setSearchClass('search-bar-small')
      }

      function handleSearchBarClick(){
        if( searchClass == 'search-bar-small' ){
          setSearchClass('search-bar-large')
          document.getElementById('search').focus();
      } 
      }
      //async function that fetchs api data based on what user typed in search box
     async function handleSearchEnter(){
      setAlbumsInYears([]);
      setSinglesInYears([]);
      setArtistInfo([]);
      //get request using search token 
        
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' +searchText +'&type=artist' , searchParams)
        .then(response=> response.json())
        .then(data => {
           console.log(data.artists)
         // variable that contains artist name, image, and genres 
         let artistBundle = [data.artists.items[0].name, data.artists.items[0].images[0].url,[...data.artists.items[0].genres], data.artists.items[0].followers.total, data.artists.items[0].external_urls.spotify]

          setArtistInfo( [...artistBundle])

          return data.artists.items[0].id})
      //get request with artist ID grab all albums from artist 
       //   console.log(artistID);
    
      //display those albums to user
        await fetch('https://api.spotify.com/v1/artists/'+artistID +'/albums'+'?include_groups=album,single&market=US&limit=30',searchParams)
       .then(response=> response.json())
       .then(data => {
        setAlbumsInYears([]);
        setSinglesInYears([]);
        let singles = [];
        let albums = [];
        let albumYears = {};
        let singleYears = {};

      //splits data into releaase years
      function splitYears(inputArr, outputObj){
        inputArr.reverse().forEach((item)=>{
          //findLast() rewverse through arr
          let release_year = item.release_date.substring(0,4);
          //  console.log(release_year)

          //add album to current year array
          if(outputObj.hasOwnProperty(release_year)){
            outputObj[release_year].push(item)

          }else{
             //create a new array with the album
             console.log(outputObj)
            outputObj[release_year] = [item];  
          }
        })
      
        if(inputArr[0]?.album_type == 'album'){
          setAlbumsInYears({...outputObj})

        }else if(inputArr[0]?.album_type == 'single'){
          setSinglesInYears({...outputObj})
          console.log({...outputObj})
        }
      }

        data.items.forEach((item)=>{
         if( item.album_type === 'single'){
         //  console.log(item)
          singles.push(item);
         }else{
          albums.push(item);
         }
        })
        //runs function that splits single data into  release years
        splitYears(singles ,singleYears);
        //runs function that splits album data into  release years
        splitYears(albums, albumYears);
        // console.log(singles.reverse())
        console.log(singles)
     
      })
      }

      console.log(artistInfo)

    return (
    <div className='home-container' >
      <NavBar
          onSearchEnter={handleSearchEnter} 
          searchClass={searchClass}
          onSearchBarClick={handleSearchBarClick} 
          onMouseLeave={handleMouseLeave} 
          search={searchText} 
          onSearchText={handleSearchText}
      />

    {artistInfo !='' &&  
     <div className="artist-banner"style={bgGradientStyle} >
      {/* <div className="artist-name">{artistInfo[0]}</div>   */}
          {/* <div className="artist-followers">{artistInfo[3]}</div> */}
          <div className="artist-info">
          { props.accessToken &&
         <a href={artistInfo[4]} target="_blank">
          <ColorExtractor getColors={colors => setImgColors(colors)}>
            <img className='artist-image' src={artistInfo[1]} alt={artistInfo[1]}  />
            </ColorExtractor>
         </a>}
         <div className="info">

         <div className="artist-name">{artistInfo[0]}</div>  

           { artistInfo?.[2].length >= 1 && <div id="genre">{artistInfo?.[2].length <=1 ? 'Genre:' : 'Genres:' }
              <div className="artist-genres"> 
              {/* <span id="line">| </span>  */}
                  {artistInfo?.[2]?.map((genre, key)=>{
                    return (<span className='artist-genre' key={key}> {genre} </span> )
                  })}
              </div> 
            </div>}
            </div>
          </div>
          
         
       
      </div>
      }

      <div className='home-album-content'>
        {albumsInYears != undefined  ?  
        <AlbumsContainer 
          accessToken={props.accessToken} 
          albumData={albumsInYears}
          musicType='Album'
        /> 
        : null
        }
        { singlesInYears != undefined  ? 
        <AlbumsContainer 
          accessToken={props.accessToken} 
          albumData={singlesInYears}
          musicType='Single'
        /> 
        : null } 
      
      </div>
    </div>
        )
}