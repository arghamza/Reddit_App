import React ,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;
import '../../index.css'
function Favorite(props) {
 
        const [favs,setFav]=useState([])

      
        const fetchArticles=async()=>{
//use of async await to wait for the response we get from the promise below 
     const d= await  props.firebase.getFavorites().onSnapshot((doc) => {
              //getFavorites is a method of firebase class - check firebase.js
              //onSnapshot is used to render real time data 

                setFav(doc.data().favorites) ;
                //we get one user's data and the array of his favorite posts in the fav state using setfav
                
               
            }) ;
        }
      
      
        useEffect(() => {
            fetchArticles();
           // even after the component mounts when we get the favorites it updates 
          }, [])
                 
       
                console.log("Articles : " , favs) ;//for testing purposes 
            
     
        
    return ( <div className="articles"> 
      {  favs.map(element=> 
    //   we map through the array of favorite to display them in the favorite section 
        {
            return <div className="article"> 
            <a href={"https://reddit.com" + element.url} style={{ "text-decoration":" none"}} >
                <h3  style={{"color" : "orangered" }} >{element.title}</h3>
            {element.mediaType=="image" || element.mediaType=="gif"  ? <img src={element.media} style={{width: "200px", height: "250px" }} /> :null }
            
             {element.mediaType=="article"  ? <button type="button" className="btnArt" > Click to read more </button> :null }
             </a> 
             </div>
        })}
    </div>
        
   ) }
        
      
           
               
        
       
       


export default Favorite ; 