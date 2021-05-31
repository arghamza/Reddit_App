import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Firebase , {FirebaseContext} from './components/authentification/index'
//instanciating an object from class firebase in firebase.js and giving it as value to the context provider
//following the singleton design pattern we need to work with one object firebase
ReactDOM.render(
  <React.StrictMode>
   <FirebaseContext.Provider value ={new Firebase()}>
    <App /> {/*App is  wrapped in the provider , all child and granchild component have access to the object */}
    </FirebaseContext.Provider>
 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
