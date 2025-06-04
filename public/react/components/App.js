import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Item } from "./Item";
import { ItemList } from "./ItemList";
import { AddForm } from "./AddForm";
import { UpdateForm } from "./UpdateForm";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the items
  }, []);

  return (
    <>
      <h1>Inventory App</h1>
      {/* Render the items */}
      <Item/>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/:itemId" element={<Item />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/update" element={<UpdateForm />} />
      </Routes>
    </>
  );
}

export default App;
