import React,{useState,useContext,useEffect} from 'react'
import Main from './components/main/Main'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;
import Profile from "./components/main/Favorite";
import './index.css'
import Signup from "./components/authentification/components/SignUp"
import Signin from "./components/authentification/components/SignIn"
import  {FirebaseContext} from  "./components/authentification"



const App=()=>{
 const [user,setUser]=useState(null)
  const firebase = useContext(FirebaseContext) ;//allows us to use firebase object 

console.log(user)//for testing purposes

 
  return (
    <div className="App">
      {/*returns the Main component with user and setUser as props  */}
      {/**n when user changes in the child components the Main is rerendered */}
      <Main user={user } setUser={setUser} /> 
    
  
     </div>
  );
  }

export default App;