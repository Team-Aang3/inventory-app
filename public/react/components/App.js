import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Item } from "./Item";
import { ItemList } from "./ItemList";
import { AddForm } from "./AddForm";
import { UpdateForm } from "./UpdateForm";
import './Item.css'

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function App() {
  const [items, setItems] = useState([]);
  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    // Fetch the items
    fetchItems();
  }, []);

  return (
    <>
      <h1>Inventory App</h1>
      {/* Render the items */}
  
      <Routes>
        <Route path="/" element={<ItemList items={items} />} />
        <Route path="/:itemId" element={<Item />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/update/:itemId" element={<UpdateForm />} />
      </Routes>
    </>
  );
}

export default App;
