import React, { Component } from 'react';
import { Modal } from './Modal';

export class Container extends Component {
  
  // the modal closes in different way which are re^presented by those 
  showModal = () => {
    // when popup props is set to true the container returns the modal 
    // else it returns null
  this.props.setPopup(true, () => {
  this.closeButton.focus();
});
this.toggleScrollLock();
 
};
closeModal = () => {
  //closes the modal  , the container returns null
  this.props.setPopup(false)
 
 
  // this.toggleScrollLock(); 
  // if you want to stop the user from scrolling 
};
onKeyDown = (event) => {
  // type enter and the form closes 
if (event.keyCode === 27) {
  this.closeModal();
  }
 };
onClickOutside = (event) => {
  // click outside the form and the modal closes
 if (this.modal && this.modal.contains(event.target)) return;
 this.closeModal();
 };
toggleScrollLock = () => {
  //method that stops the user from scrolling 
  //unused
 document.querySelector('html').classList.toggle('scroll-lock');
};
render() {
return (
  <React.Fragment>
  {/* if popup is set to true we return the modal 
  user , setUser and firebase  props will be used in sign in and sign up components inside the modal form  */}
{ this.props.popup ? (
  <Modal firebase={this.props.firebase}
  user={this.props.user } setUser={this.props.setUser} 
  onSubmit={this.props.onSubmit}
  modalRef={(n) => (this.modal = n)}
  buttonRef={(n) => (this.closeButton = n)}
  closeModal={this.closeModal}
  onKeyDown={this.onKeyDown}
  onClickOutside={this.onClickOutside}
  />
) : null}
</React.Fragment>
  );
 }
}
export default Container;