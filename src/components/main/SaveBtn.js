import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../index.css'


class SaveBtn extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={saved: false }
    }
    toggle = () => {
        let localsaved = this.state.saved;
        //if saved we return the yellow component and call the save method 
        //else we return the grey component and unsave the post 
        localsaved = !localsaved;
        this.setState({ saved: localsaved });
        if(localsaved) { this.save()}
        else{ this.unsave()}
      };
      save()
      {
        /**saving post to the database by calling the addFavorite method  */
           this.props.firebase.addFavorite(this.props.title , this.props.url , this.props.media , this.props.mediaType )
      }
      unsave( )
      {
          /**removing post from firebase by calling the removeFavorite method  */
        this.props.firebase.removeFavorite(this.props.title , this.props.url , this.props.media , this.props.mediaType )
      }
      render() {
        return (
         
              <div
                className="savedBtn"
                
                onClick={() => this.toggle()} >
                {this.state.saved === false ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStar} style={{color: "gold" }}/> 
                  // onclick the icon turns yellow to show user post has been saved 
                )}
              </div>
           
        );
      }
    }
      
    export default SaveBtn;
