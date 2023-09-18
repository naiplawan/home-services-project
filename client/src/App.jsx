import { useAuth } from "./contexts/authentication.jsx";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import UnauthenticatedApp from "./pages/UnauthenticateApp.jsx";

function App() {
  const auth = useAuth();
  // logic true or false ตรวจสอบว่าผู้ใช้งานมีการรับรองตัวตนแล้วหรือยัง True จะแสดง <AuthenticatedApp /> : false จะแสดง <UnauthenticatedApp />
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
