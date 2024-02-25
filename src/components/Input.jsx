// import '../styles/Input.css'
import { useState, useEffect } from 'react';

export default function Input(){
   const [searchClass, setSearchClass] = useState('input-small');
   const [searchText, setSearchText] = useState('');
   const runining = true;
   
    function handleSearchBarClick(){
         if( searchClass == 'input-small' ){
            setSearchClass('input-large')
            document.getElementById('search').focus();
        } 
    }

    function handleSearchText(e){
        setSearchText(e.target.value);
        console.log(searchText)
    }
    function handleMouseLeave(){
        console.log('mouse')
       if(searchClass == 'input-large' && searchText == 0) setSearchClass('input-small')

    }
    return(
        <div className="custom_input" onClick={handleSearchBarClick} onBlur={handleMouseLeave} > 
            <svg xmlns="http://www.w3.org/2000/svg" className="svg_icon bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>

        <input 
            value={searchText}
            onChange={handleSearchText}  
            id="search" className={'input' + ' ' + searchClass} 
            type="text" placeholder="Search Albums"
            onKeyDown={(e)=> e.key == 'enter' && props.onSearch}
            />
            
        </div>

    )
}