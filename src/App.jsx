import { useState, useEffect } from 'react'

import './styles/App.css'
import HomeContainer from './components/HomeContainer.jsx';
const CLIENT_ID = 'e2abc18b0bc147169ee86e768770d4bd';
const CLIENT_SECRET = '12f45773864e4d46a6ab5452d9223f30';


function App() {
  const [accessToken, setAccessToken] = useState('');
  // const [keyFunction, setKeyFunction]= useState();
 
  async function getKey () {
    
  }
 
  useEffect(()=>{
    //  const interval = setInterval(()=>{
    //getKey()
      // },360000)
    
      fetch( 'https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
         body: 'grant_type=client_credentials&client_id='+ CLIENT_ID +'&client_secret='+ CLIENT_SECRET
   
  })
  .then(response => response.json())
  .then(data => {
     //console.log(data.access_token)
      setAccessToken(data.access_token)
  })
  .catch(error => {
      console.error(error);
  });
      // return ()=>clearInterval(interval)
  },[])

  


  return (
          <HomeContainer accessToken={accessToken}  />
    )
}

export default App
