import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import apiURL from "../api";
import "../styles/Forms.css";

export function UpdateForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [originalItem, setOriginalItem] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { itemId } = useParams();
  const apiURLWithId = `${apiURL}/items/${itemId}`;

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(apiURLWithId);
        const data = await res.json();
        setOriginalItem(data);

        //prefill form with existing data
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          image: data.image,
        });
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Failed to fetch item details.");
      }
    }

    fetchItem();
  }, [itemId]);

  async function handleSubmit(e) {
    e.preventDefault(); //prevent page reload

    if (!originalItem) return;

    //only update formData if fields have changed
    const updatedItem = {
      name: formData.name.trim() || originalItem.name,
      description: formData.description.trim() || originalItem.description,
      price: formData.price || originalItem.price,
      category: formData.category.trim() || originalItem.category,
      image: formData.image.trim() || originalItem.image,
    };

    //post fetch to update item
    try {
      const res = await fetch(apiURLWithId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      //error handling
      if (!res.ok) setError("Failed to update item.");

      //parse data
      const data = await res.json();
      console.log("Item updated successfully:", data);

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      }); //reset form fields

      nav(`/${data.updateItem.id}`);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Update Item</h2>

        {/* error validation message */}
        {error && <p className="errorMsg">{error}</p>}

        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            placeholder="Enter item name"
            className={touchedFields.name ? "normal-input" : "prefilled-input"}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setTouchedFields({ ...touchedFields, name: true });
            }}
          />
        </label>

        <label>
          Description:
          <textarea
            value={formData.description}
            placeholder="Enter item description"
            className={
              touchedFields.description ? "normal-input" : "prefilled-input"
            }
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setTouchedFields({ ...touchedFields, description: true });
            }}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            value={formData.price}
            placeholder="Enter item price"
            className={touchedFields.price ? "normal-input" : "prefilled-input"}
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
              setTouchedFields({ ...touchedFields, price: true });
            }}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            value={formData.category}
            placeholder="Enter item category"
            className={
              touchedFields.category ? "normal-input" : "prefilled-input"
            }
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
              setTouchedFields({ ...touchedFields, category: true });
            }}
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            value={formData.image}
            placeholder="Enter item image URL"
            className={touchedFields.image ? "normal-input" : "prefilled-input"}
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.value });
              setTouchedFields({ ...touchedFields, image: true });
            }}
          />
        </label>

        <div className="formBtns">
          <button type="submit" className="formBtn">
            Update Item
          </button>
          <button onClick={() => nav(`/${itemId}`)} className="formBtn">
            Back to Item
          </button>
        </div>
      </form>
    </>
  );
}
