import { useAuth } from "./contexts/authentication.jsx";

function LogoutMock() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button className="w-[200px] h-[50px] bg-blue600" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutMock;