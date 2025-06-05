import { useNavigate } from "react-router";

export function ItemList({ items }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${id}`);
  };
  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
  );
}
