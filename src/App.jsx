import { useState, useEffect } from 'react'

import './styles/App.css'
import AlbumContainer from './components/album-card/AlbumContainer.jsx';
const CLIENT_ID = 'e2abc18b0bc147169ee86e768770d4bd';
const CLIENT_SECRET = '12f45773864e4d46a6ab5452d9223f30';


function App() {
  const [accessToken, setAccessToken] = useState('');
 
 
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
        setAccessToken(data.access_token)
    })
    .catch(error => {
        console.error(error);
    });
   
    
  },[])

  


  return (
          <AlbumContainer accessToken={accessToken} />
    )
}

export default App
