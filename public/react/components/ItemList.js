import { useNavigate } from "react-router-dom";

export function ItemList({ items }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${id}`);
  };
  return (
    <>
      <div>
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
