import { useAuth } from "../contexts/authentication";
import { Button } from '@supabase/ui';

const FacebookLoginButton = () => {
  const logInWithFacebook = useAuth(); // Use the authentication context hook to get the login function

  return (
    <div>
      <Button onClick={logInWithFacebook}>Login with Facebook</Button>
    </div>
  );
};

export default FacebookLoginButton;
