import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiURL from "../api";
import "../styles/Item.css";

export function Item() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const apiURLWithId = `${apiURL}/items/${itemId}`;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await fetch(apiURLWithId, {
        method: "DELETE",
      });
      navigate("/");
    } catch (err) {
      setError("Failed to delete item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(apiURLWithId);
        const itemData = await response.json();
        setItem(itemData);
      } catch (err) {
        setError("Error retrieving item", err);
      }
    }
    fetchItem();
  }, [itemId]);

  return item ? (
    <div
      className="item-detail-card"
      style={{ display: "flex", alignItems: "flex-start" }}
    >
      <img className="item-img" src={item.image} alt={item.name} />
      <div className="item-info">
        {" "}
        <h2 className="item-name">{item.name}</h2>
        <p className="item-category">Category: {item.category}</p>
        <p className="item-price">${item.price}</p>
        <p className="item-description">{item.description}</p>{" "}
      </div>
      <button onClick={() => navigate(-1)} className="btn">
        Back
      </button>
      <button onClick={() => navigate(`/update/${itemId}`)} className="btn">
        Edit
      </button>
      <button onClick={handleDelete} className="btn" disabled={isDeleting}>
        {isDeleting ? "Deleting" : "Delete"}
      </button>
      {error && <div className="error-msg">{error}</div>}{" "}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
