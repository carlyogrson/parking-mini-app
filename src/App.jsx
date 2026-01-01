import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Active from "./Active.jsx";
import Payment from "./Summary.jsx";
import Success from "./Success.jsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/active" element={<Active />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/summary" element={<Payment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
