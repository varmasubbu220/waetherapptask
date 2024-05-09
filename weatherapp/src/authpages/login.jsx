import React, { useEffect } from 'react';
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

const Login = () => {

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse)
      const token = credentialResponse.credential
      localStorage.setItem('token', token);
      window.location.href = '/home';
    },
    onError: () => {
      console.log('Login Failed');
        alert('Login Failed. Please try again.');
    },
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
                auto_select
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
