import { useAuth } from "./contexts/authentication.jsx";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import UnauthenticatedApp from "./pages/UnauthenticateApp.jsx";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
