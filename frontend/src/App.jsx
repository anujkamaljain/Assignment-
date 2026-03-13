import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const ListPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white text-xl">
    Employee List
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <ListPlaceholder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
