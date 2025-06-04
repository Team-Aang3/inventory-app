import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiURL from "../api";
import "../styles/Item.css";

export function Item() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const apiURLWithId = `${apiURL}/items/${itemId}`;
  const handleDelete = async () => {
    await fetch(apiURLWithId, {
      method: "DELETE",
    });
    navigate("/items");
  };

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(apiURLWithId);
        const itemData = await response.json();
        setItem(itemData);
      } catch (err) {
        console.log("Error retrieving item", err);
      }
    }
    fetchItem();
  }, [itemId]);

  return item ? (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate(`/update/${itemId}`)}>Edit</button>
      <div>{item.name}</div>
      <div>{item.category}</div>
      <div>${item.price}</div>
      <div>{item.description}</div>
      <img src={item.image} alt={item.name} />

      <button onClick={handleDelete}>Delete</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
