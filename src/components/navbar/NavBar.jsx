import React from 'react';
import '../../styles/NavBar.css'


export default function NavBar(props){
   
    // const [searchText, setSearchText] = useState('');

    // console.log(props)
    
 
    //  function handleSearchText(e){
    //      setSearchText(e.target.value);
    //      console.log(searchText)
    //  }
   

    return(
    <div className='navbar'>
        <div className="custom_input" onClick={props.onSearchBarClick}   onBlur={props.onMouseLeave}
 > 
            <svg xmlns="http://www.w3.org/2000/svg" className="svg_icon bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
            <input 
                value={props.search} 
                onChange={props.onSearchText}  
                id="search" className={'input' + ' ' + props.searchClass} 
                type="text" 
                placeholder="Search Albums"
                onKeyDown={(event)=> {
                    if(event.code == 'Enter'){
                       props.onSearchEnter();
                    }
                }}
                />
        </div>
    </div>
    )
}