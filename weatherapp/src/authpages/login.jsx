import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google login
    console.log('Login Success:', response);
    // You can now access user details from `response.profileObj`
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle failed Google login
    console.error('Login Failure:', error);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <GoogleLogin
                clientId="229005826878-nvdctngta76isr5dqarjhe0g3lbqm0i1.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
