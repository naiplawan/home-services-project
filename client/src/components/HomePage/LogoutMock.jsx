import { useAuth } from "../contexts/authentication";

function LogoutMock() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button className="prompt text-sm font-bold text-[#336DF2] border border-[#336DF2] w-[100px] h-[35px] rounded-lg" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutMock;