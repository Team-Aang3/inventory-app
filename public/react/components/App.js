import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Item } from "./Item";
import { ItemList } from "./ItemList";
import { AddForm } from "./AddForm";
import { UpdateForm } from "./UpdateForm";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function App() {
  const [items, setItems] = useState([]);
  const location = useLocation();
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
  }, [location.pathname]);

  return (
    <>
      <h1 className="Title">Inventory App</h1>
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
