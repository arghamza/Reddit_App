import React,{useState,useContext} from 'react' ; 
import './popup-form/popup.css'
import Articles from './Article';
import Navbar from './Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;
import { Container } from './popup-form/Container';
import {FirebaseContext} from '../authentification/'
import Favorite from './Favorite'
function Main({user,setUser}) {
  
    const firebase = useContext(FirebaseContext) ; //getting the context containing the firebase object 
    console.log(user)
  const[subreddit, setSubreddit]=useState('memes'); // we set subreddit per default to memes 
  const[popup, setPopup]=useState(false); //if set to true will show the popup forms sign in and sign up 
  const onSubmit = (event) => {
  event.preventDefault(event);
//   stops it from updating
  
};


    return ( <div className="main" style={{height : "auto" }}>
      
        <Router>
       
   {/* returning the navbar with the firebase object and setUser and user as props  */}
   <Navbar subreddit={subreddit} setSubreddit={setSubreddit} popup={popup} setPopup={setPopup} user={user} setUser={setUser} firebase={firebase} /> 

       
      {/* container decides to show the popup or not dependend on the value of the popup state  
      but should always be returned  */}
   <Container user={user} setUser={setUser}  onSubmit={onSubmit} popup={popup} setPopup={setPopup} firebase={firebase} /> 
        {/* routing */}
      <Switch>
      <Route exact path="/">
      <Articles subreddit={subreddit} user={user} setUser={setUser} firebase={firebase}  media={""} />  
          </Route>
         
        
         
          
          <Route exact path="/images">
      <Articles user={user} subreddit={subreddit} firebase={firebase} setUser={setUser} media={"image"} /> 
          </Route>
          <Route exact path="/videos">
      <Articles user={user}  subreddit={subreddit} setUser={setUser} firebase={firebase}  media={"video"} />  
          </Route>
          {/* if user connected favorite is returned and show  */}
          { user ? <Route exact path="/favorites">
     <Favorite firebase={firebase}  setUser={setUser}  user={user}/> 
          </Route> : null
           }
    
    
      </Switch>
       
     


</Router>
       
        </div>
    )
    }

export default Main
