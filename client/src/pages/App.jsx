import "../styles/App.css";
import LoginForm from "./LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/LoginPage" element={LoginForm} />
        </Routes>
      </BrowserRouter>
      <LoginForm/>
    </>
  );
}

export default App;
