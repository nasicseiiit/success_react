import React from "react";

class AddItem extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
  
    
    if(newItemValue) {
      this.addItem(newItemValue);
      event.target.reset();
      this.setState({todoItems: todoItems});
    }
    
  }
} 
  export default AddItem;