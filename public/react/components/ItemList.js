import { useNavigate } from "react-router";
import { useState } from "react";

export function ItemList({ items }) {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");

  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  const filteredItems = items.filter((item) => {
    const lowerCaseSearch = searchItem.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearch) ||
      item.category.toLowerCase().includes(lowerCaseSearch)
    );
  });
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
          {filteredItems.map((item) => {
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
