import React from 'react';
const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };
  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};
export default Login;
