import React, { Component } from "react";
import { Button } from "./button";
import { MenuItems } from "./MenuItems";
import './Navbar.css'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;

class Navbar extends Component {
    state ={ clicked:false }
   
    handleClick=()=>{
        this.setState({clicked: !this.state.clicked})
    }
  render() {
    return (
      <nav className="NavbarItems">
         <Link to="/">  <img src="../../images/logo.png"  className = "logo" alt="" /></Link> 
         {/* an icon that show up when the window size is reduced or for mobile usage which makes our app responsive  */}
          {/* the display is toggled into column wehn the window is short enough in NavBar.css  */}
        <div className="menu-icon" onClick={this.handleClick}>
         {/* it's icon that open and close the new column nav menu */}
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        {/* search bar that gives the api the topic  */}
        <input type="text" className="search-bar " value={this.props.subreddit} onChange={e=>this.props.setSubreddit(e.target.value)}/>
        <i class="fas fa-search"></i>
        {/* we map the navbar items stored in MenuItems.js into the Navbar*/}
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link  className={item.cName} to={item.url}>   {item.title} </Link>
              </li>
            );
          })}
          {/* the favorite option is apart because the user should be logged in */}
      {this.props.user!=null ?  <li >
                <Link  user={this.props.user} className="nav-links" to='/favorites'>  favorites </Link>
              </li> :null}
        </ul>
        {/* if the user isn't logged in the log out button appear */}
        {this.props.user!=null ? <Button onClick={()=>{ this.props.firebase.SignoutUser().then(result=>alert("you've loged out "));this.props.setUser(null) ;}}>Logout</Button> :
        // else we display the join us button we the pop up form onClick
        <Button onClick={()=>{ this.props.popup ? this.props.setPopup(false):this.props.setPopup(true) } } >Join us</Button> }
      </nav>
    );
  }
}
export default Navbar;
