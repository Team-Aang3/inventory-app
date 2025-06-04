import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../style.css'

export function Item() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const handleDelete = async () => {
    await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
    });
    navigate("/items");
  };

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/items/${itemId}`);
        const itemData = await response.json();
        setItem(itemData);
      } catch (err) {
        console.log("Error retrieving item", err);
      }
    }
    fetchItem();
  }, [itemId]);

  if (!item) return <div>Loading...</div>;
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.category}</p>
      <p>${item.price}</p>
      <p>{item.description}</p>
      <img src={item.image} alt={item.name} />
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate(`/update/${itemId}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
