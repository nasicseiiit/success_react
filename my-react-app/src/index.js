import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


var todoItems = [];

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.state = {
      todoItems: todoItems,
    };

  }

  clearItem = (todoItem) => {
    const index = todoItems.indexOf(todoItem);
    if (index > -1) {
      todoItems.splice(index, 1);
      this.setState({todoItems: todoItems});
      }
  }

  completeItem(todoItem){
    const index = todoItems.indexOf(todoItem);
    if (index > -1 && todoItem.indexOf("completed ")==-1) {
    todoItems[index] = "completed "+todoItem;
    this.setState({todoItems: todoItems});
    }
    else{
      alert("Already completed the task");
    }
    
  }


  addItem(todoItem) {
    todoItems.push(todoItem);
  }

  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.addItem(newItemValue);
      event.target.reset();
      this.setState({todoItems: todoItems});
    }
    
  }

  render() {
   const listItems = todoItems.map((item) =>
    <li key={item.toString()}>
      {item}<button className="complete" onClick={() => this.completeItem(item)}>✓</button>
      <button className="close" onClick={() => this.clearItem(item)}>x</button>
      
    </li>
  );
  
    return (
      <div id="main">
      <h1>
        Todo List
      </h1>
      <form onSubmit={this.onSubmit}>
        <input type="text" ref="itemName" placeholder="Add a task" ></input>
        <input type="submit" value="Add task"></input> 
        <ul>{listItems}</ul>
      </form>
     
      </div>
    );
  }
}

ReactDOM.render(<TodoApp  />, document.getElementById('app'));