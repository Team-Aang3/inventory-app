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
    <div className="item-detail-card">
      <img className="item-img" src={item.image} alt={item.name}/>
       <h2 className="item-name">{item.name}</h2>
       <p className="item-category">{item.category}</p>Add commentMore actions
       <p className="item-price">${item.price}</p>
      <p className="item-description">{item.description}</p>
     
      <button onClick={() => navigate(-1)} className="btn">Back</button>
      <button onClick={() => navigate(`/update/${itemId}`)} className="btn">Edit</button>
      <button onClick={handleDelete} className="btn">Delete</button> </div>
  ) : (
    <div>Loading...</div>
  );













}
