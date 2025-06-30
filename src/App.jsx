import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { CategoryProvider } from "./Context/CategoryContext";

function App() {
  return (
    <CategoryProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </CategoryProvider>
  );
}

export default App;
