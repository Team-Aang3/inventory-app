import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const [error, setError] = useState("");
  const nav = useNavigate();
  const { itemId } = useParams();
  const apiURLWithId = `${apiURL}/items/${itemId}`;

  async function handleSubmit(e) {
    e.preventDefault(); //prevent page reload

    //error validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.image
    ) {
      setError("All fields are required.");
      return;
    }
    setError(""); //clear previous errors

    //post fetch to update item
    try {
      const res = await fetch(apiURLWithId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            value={formData.description}
            placeholder="Enter item description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            value={formData.price}
            placeholder="Enter item price"
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            value={formData.category}
            placeholder="Enter item category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            value={formData.image}
            placeholder="Enter item image URL"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
        </label>

        <div className="formBtns">
          <button type="submit" className="formBtn">
            Update Item
          </button>
          <button onClick={() => nav("/")} className="formBtn">
            Back to Items
          </button>
        </div>
      </form>
    </>
  );
}
