import React, { useState } from "react";
import { Link } from "react-router-dom";
import './forms.css'
// this is a form component with states representing each data that the user enters 
const SignUp = (props) => {
  const firebase = props.firebase ; 
  console.log(props)
 //initializing states 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit=event=>
  {
    //when user submits form we call on the signup method from firebase.js 
    //it returns a promise 
    event.preventDefault();
    firebase.SignupUser(email,password).then( (user)=>
      {  
        console.log(user)
        props.setUser(user) //setting the user to current user to force re-rendering from Main component 
        firebase.profileUpdate(displayName)  ; // please check firebase.js to see what these methods stand for 
        // freeing states 
        setEmail('') 
        setPassword('')
        setDisplayName('')
        props.close() ;
      }).catch((error)=>{
          setError(error.message) 
        //sets error message to be displayed to the user in the <div> below 
       }) 
  }
  const onChangeHandler = event => {
    // when an input changes it is instantly saved in the state 
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    
    <div className="sign">
     
      
        
        <form  className="sign-form" onSubmit={(event)=> handleSubmit(event) }>
       
        <h1 >Join us  </h1>
        {error !== null && (
          <div className="error"><i class="fas fa-exclamation-triangle"></i>
          {/* displays error message if authentification is not successful */}
            {error}
          </div>
        )}
        <input
          autoComplete="" required
            type="text"
            className="inputs username"
            name="displayName"
            value={displayName}
            placeholder="Username"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          
          <input
          autoComplete=""
           required
            type="email"
            className="inputs email"
            name="userEmail"
            value={email}
            placeholder="Email"
            class="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          
          <input
           required
            type="password"
            className="inputs password"
            name="userPassword"
            value={password}
            placeholder="Password"
            class="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <br></br>
          <button type="submit" 
            className="sign-btn" onClick={(event)=> handleSubmit}>
            Sign up
          </button>
      <br></br>
          <span
          //google authentification 
           onClick={()=>{firebase.SignInWithGoogle() ;  }}
          ><i class="fab fa-google-plus-g"></i>  or sign up with google   </span>
       
     
        </form>
      </div>
   
  );
};
export default SignUp;