import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
var firebase = require('firebase');
var uuid = require('uuid');
var firebaseConfig = {
  apiKey: "AIzaSyC_eyjAn6U7eRNnb4FzDpz6cUZ6fkJwlY4",
  authDomain: "react-1721d.firebaseapp.com",
  databaseURL: "https://react-1721d.firebaseio.com",
  projectId: "react-1721d",
  storageBucket: "react-1721d.appspot.com",
  messagingSenderId: "894067308062",
  appId: "1:894067308062:web:0ea9952dc6ef962735600f",
  measurementId: "G-DXXML1B0BF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var todoItems = [];
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.resetItem = this.resetItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.clearItem = this.clearItem.bind(this);

    this.state = {
      uid: uuid.v1(),
      todoItems: todoItems,
    };

  }

  resetItem = (todoItem) => {
    const index = todoItems.indexOf(todoItem);
    if (todoItem.includes("completed ")) {
      todoItems[index]= todoItem.substring('completed '.length);
      this.setState({todoItems: todoItems});
      }
  }

  clearItem = (todoItem) => {
    const index = todoItems.indexOf(todoItem);
    if (index > -1) {
      todoItems.splice(index, 1);
      this.setState({todoItems: todoItems});
      }
      else{
        alert("The task is not completed");
      }
  }

  completeItem=(todoItem) => {
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
    firebase.database().ref('Nasireact/'+this.state.uid).set({
      todoItems: this.state.todoItems
    });
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
      <button className="reset"  onClick={() => this.resetItem(item)}>reset<i class="icon-refresh"></i></button>
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