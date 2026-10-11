import { useAuth } from "../contexts/authentication";

function LogoutMock() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button className="w-[100px] rounded-lg border border-[#336DF2] text-sm font-prompt font-bold text-[#336DF2] h-[35px]" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutMock;
