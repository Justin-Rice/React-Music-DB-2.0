import { useState, useEffect } from 'react'

import './styles/App.css'
import NavBar from './components/navbar/NavBar.jsx';
import AlbumContainer from './components/album-card/AlbumContainer.jsx';
const CLIENT_ID = 'e2abc18b0bc147169ee86e768770d4bd';
const CLIENT_SECRET = '12f45773864e4d46a6ab5452d9223f30';
let defaultArtists = ['Tyler, The Creator','Hiatus Kaiyote','Lena Raine']


function App() {
  const [searchText, setSearchText] = useState('');
  const [searchClass, setSearchClass] = useState('input-small');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  let searchParams = {
    method: 'GET',
    headers: {
      "Content-Type": 'application/json',
      "Authorization" : 'Bearer ' + accessToken
    }

  }
 
  //'Tyler, The Creator','Hiatus Kaiyote','Thundercat','Mac Ayres','Lena Raine','Chris Christodoulou'

  //client verfification and token retrevial on load
  useEffect(()=>{
    fetch( 'https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
           body: 'grant_type=client_credentials&client_id='+ CLIENT_ID +'&client_secret='+ CLIENT_SECRET
     
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data.access_token); // read server response
        setAccessToken(data.access_token)
    })
    .catch(error => {
        console.log('it no work');
    });
    let randomArtist = defaultArtists[Math.floor(Math.random()*defaultArtists.length)];
    preload(randomArtist);
    // console.log('useeffect')
  },[])
  
  //selects an artist name from  a preloaded list to generate albums 
   async function preload(randomArtist){
    
    // console.log(randomArtist);

   
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' +randomArtist +'&type=artist' , searchParams)
    .then(response=> response.json())
    .then(data => {

      // variable that contains artist name, image, and genres 
     let artistBundle = [data.artists.items[0].name, data.artists.items[0].images[0].url,[...data.artists.items[0].genres]]
       // console.log(artistBundle);
      setArtistInfo( [...artistBundle])
      //  console.log(artistInfo)
      return data.artists.items[0].id})
  //get request with artist ID grab all albums from artist 
      // console.log(artistID);


  // display those albums to user
    await fetch('https://api.spotify.com/v1/artists/'+artistID +'/albums'+'?include_groups=album&market=US&limit=30',searchParams)
   .then(response=> response.json())
  .then(data => {
    // console.log(data.items)
    setAlbums([...data.items])})
   
  }

  function handleSearchText(e){
    setSearchText(e.target.value);
    // console.log(searchText)
  }
  function handleMouseLeave(){
    // console.log('mouse')
   if(searchClass == 'input-large' && searchText == 0) setSearchClass('input-small')

  }
  function handleSearchBarClick(){
    if( searchClass == 'input-small' ){
      setSearchClass('input-large')
      document.getElementById('search').focus();
  } 
  }
  //function that runs when user hits enter while focued on seacrh input 
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
         <>
          <NavBar 
            onSearchEnter={handleSearchEnter} 
            searchClass={searchClass}
            onSearchBarClick={handleSearchBarClick} 
            onMouseLeave={handleMouseLeave} 
            search={searchText} 
            onSearchText={handleSearchText}
          />
          <AlbumContainer
            artistData={artistInfo}
            albumData={albums}
          />
        </>
    
  )
}

export default App
