import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./firebase/AuthContext.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Ingredients from "./pages/Ingredients/Ingredients.jsx";
import Recipes from "./pages/Recipes/Recipes.jsx";


function App() {
  return (
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-ingredients" element={<Ingredients />} />
          <Route path="/add-recipes" element={<Recipes />} />
        </Routes>
      </Router>
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
