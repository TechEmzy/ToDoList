import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [items, setItems] = useState([]);

  // Function to add an item to the state and local storage
  function addItem(inputText) {
    setItems(prevItems => {
      const newItems = [...prevItems, inputText];
      localStorage.setItem("todoItems", JSON.stringify(newItems)); // Save to local storage
      return newItems;
    });
  }

  // Function to delete an item from the state and local storage
  function deleteItem(id) {
    setItems(prevItems => {
      const updatedItems = prevItems.filter((item, index) => index !== id);
      localStorage.setItem("todoItems", JSON.stringify(updatedItems)); // Save to local storage
      return updatedItems;
    });
  }

  // Function to retrieve items from local storage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
