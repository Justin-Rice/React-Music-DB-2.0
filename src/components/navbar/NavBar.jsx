import React from 'react';
import './NavBar.scss';


export default function NavBar(props){
    return(
    <div className="navbar">
        <div onClick={()=>{location.reload()}}className="nav-title">Music Db</div>
        <div className={'search-bar' + ' ' + props.searchClass}>
            <div 
                className="custom_input" 
                onClick={props.onSearchBarClick}   
                onBlur={props.onMouseLeave}
            > 
                <svg xmlns="http://www.w3.org/2000/svg" className="svg_icon bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
                <input 
                    value={props.search} 
                    onChange={props.onSearchText}  
                    id="search" className='input'  
                    type="text" 
                    placeholder="Search Artists"
                    disabled={props.disabledClick}
                    onKeyDown={(event)=> {
                        if(event.code == 'Enter'){
                        props.onSearchEnter();
                        }
                    }}
                    >   
                    </input>
            </div>
            <div onClick={props.onSearchEnter} className="search">Go</div>
        </div>
    </div>
    )
}