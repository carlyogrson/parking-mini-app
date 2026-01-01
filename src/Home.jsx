import { useNavigate } from "react-router-dom";
import { createSession } from "./lib/session.js";

const parkingList = [
  { id: 1, name: "Parking A", price: 1000 },
  { id: 2, name: "Parking B", price: 1500 },
  { id: 3, name: "Parking C", price: 800 },
];

export default function Home() {
  const navigate = useNavigate();

  function start(p) {
    const user = JSON.parse(localStorage.getItem("super_qi_user") || "{}");
    createSession({ spot: p.name, pricePerHour: p.price, user });
    navigate("/active");
  }

  return (
    <div className="container">
      <h2>اختر موقف</h2>

      {parkingList.map(p => (
        <div className="card" key={p.id}>
          <div className="card-title">{p.name}</div>
          <div className="card-sub">{p.price} IQD / ساعة</div>
          <button className="btn-primary" onClick={() => start(p)}>
            ابدأ الموقف
          </button>
        </div>
      ))}
    </div>
  );
}
