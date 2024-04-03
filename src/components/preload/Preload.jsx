import './preload.scss';

export default function Preload(props){
   const {troubleshoot}= props
   
return  (
<div className="preload-container">
    {troubleshoot == true ?  
    <div className="preload">
        <div className="preload-header">
            Troubleshooting:
        </div>
        <div className="preload-info">
            <p>if you are seeing this page after searching an artist it means one of three things likley happened:</p>
            <p>the artist you seacrhed for does not exist within spotifys database</p>
            <p>you missplelled the artists name while searching and they were not found</p>
            <p>or, your search token has expired due to inactivity and you should refresh the page</p>
        </div>
   </div> 
    :
    <div className="preload">
        <div className="preload-header">
            Welcome
        </div>
        <div className="preload-info">
            <p>
                this is my Music Database project that is using data pulled from Spotifys API.
            </p>

            <p>
                To get started, simply click on the search icon and enter the name of the artist whose discography you'd like to explore. 
            </p>
            <p>
                Once an artist is found you can click on their image to explore their spotify page, or click on an album to see its tracklist 
            </p>
            <p>
                This website was designed and developed by <span> Justin Rice</span>, using SCSS and React
            </p>

        </div>
   </div> 
   
   }
 
  
</div>
)

}