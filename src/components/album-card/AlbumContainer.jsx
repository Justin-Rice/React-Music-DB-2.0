import '../../styles/Album.css';
import AlbumCard  from './AlbumCard';
import {useState, useEffect} from 'react';
import NavBar from '../navbar/NavBar';

export default function AlbumContainer(props){
  // console.log(props)
    //state 
    const [artistInfo, setArtistInfo] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [searchClass, setSearchClass] = useState('input-small');
    const [searchText, setSearchText] = useState('');
    const [bearerCheck, setBearerCheck]= useState(false);
    let defaultArtists  = ['Tyler, The Creator','Hiatus Kaiyote','Lena Raine','Christoper Larkin','Mavi','tobi lou', 'redveil']
    let randomArtist = defaultArtists[Math.floor(Math.random()*defaultArtists.length)]
    let searchParams = {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : 'Bearer ' + props.accessToken
        }
    
      }

      //run once on load
      useEffect(()=>{
        console.log(searchParams)
        const timerId = setInterval(()=>{

          if(props.accessToken !== '' ){
            console.log(props.accessToken)

            searchParams = {
              method: 'GET',
              headers: {
                "Content-Type": 'application/json',
                "Authorization" : 'Bearer ' + props.accessToken
              }
          
            }
            console.log(searchParams)
            preload(defaultArtists)
            clearInterval(timerId);
          }else{
            console.log(props.accessToken)
            //props.getKey()

            
          }
        
        },1000)
       },[])
  
    //async function that populates page based on random artist in array    
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
          // console.log(artistID);
    
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
       if(searchClass == 'input-large' && searchText == 0) setSearchClass('input-small')
      }

      function handleSearchBarClick(){
        if( searchClass == 'input-small' ){
          setSearchClass('input-large')
          document.getElementById('search').focus();
      } 
      }
      //async function that fetchs api data based on what user typed in search box
     async function handleSearchEnter(){
      setAlbums([]);
      setArtistInfo([]);
      //get request using search token 
        
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' +searchText +'&type=artist' , searchParams)
        .then(response=> response.json())
        .then(data => {
         // variable that contains artist name, image, and genres 
         let artistBundle = [data.artists.items[0].name, data.artists.items[0].images[0].url,[...data.artists.items[0].genres]]
           // console.log(artistBundle);
          setArtistInfo( [...artistBundle])
          //  console.log(artistInfo)
          return data.artists.items[0].id})
      //get request with artist ID grab all albums from artist 
          console.log(artistID);
    
      //display those albums to user
        await fetch('https://api.spotify.com/v1/artists/'+artistID +'/albums'+'?include_groups=album&market=US&limit=30',searchParams)
       .then(response=> response.json())
      .then(data => {setAlbums([...data.items])})
      }
     
    return (
    <div>
        <NavBar
            onSearchEnter={handleSearchEnter} 
            searchClass={searchClass}
            onSearchBarClick={handleSearchBarClick} 
            onMouseLeave={handleMouseLeave} 
            search={searchText} 
            onSearchText={handleSearchText}
         />
      
        <div className="artist-banner">
            <div className="text">{artistInfo[0]}</div>  
            <div className="artist-genre">{
              artistInfo?.[2]?.map((genre, key)=>{
                return <span className='genre' key={key}>{genre}</span>
              })
            }</div>
         { props.accessToken && <img className='artist-image' src={artistInfo[1]} alt={artistInfo[1]}  />}
        </div>
        <div className='album-container'>
           { albums.map((album, key)=>{
           return <AlbumCard accessToken={props.accessToken} key={key} albumData={album}></AlbumCard>

           })
            }
           
        </div>
    </div>
        )
}