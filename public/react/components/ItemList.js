import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ItemList({ items }) {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");

  const handleClick = (id) => {
    navigate(`/${id}`);
  };
  return items ? (
    <>
      <div>
        <div className="search-add-container">
          <input
            type="text"
            placeholder="Search by name or color..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="search-input"
          />
          <button onClick={() => navigate("/add")} className="add-btn">
            +
          </button>
        </div>
        <ul className="card-list">
          {items.map((item) => {
            return (
              <li key={item.id} className="card">
                <img src={item.image} alt="item-image" className="item-image" />
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price}</p>
                <button
                  onClick={() => handleClick(item.id)}
                  className="details-btn"
                >
                  Details
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}
