import { useAuth } from "./contexts/authentication.js";
import AuthenticatedApp from "./pages/AuthenticatedApp.js";
import UnauthenticatedApp from "./pages/UnauthenticatedApp.js";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
