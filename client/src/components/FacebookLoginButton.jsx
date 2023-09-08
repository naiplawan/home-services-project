import  { useEffect, useState } from 'react';
import { useAuth } from "../contexts/authentication";
import { Button } from '@supabase/ui';

const FacebookLoginButton = () => {

  const signInWithFacebook = useAuth(); // ใส่ logic signIn With Facebook จาก context ที่เราสร้างไว้

  
  return (
    <div>
        <Button onClick={signInWithFacebook}>Login with Facebook</Button>
    </div>
  );
};

export default FacebookLoginButton;
