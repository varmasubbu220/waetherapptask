import React, { useEffect, useState } from 'react';
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

const Login = () => {
  // Initialize users array
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        try {
            const parsedUsers = JSON.parse(storedUsers);
            setUsers(parsedUsers);
        } catch (error) {
            console.error('Error parsing stored users:', error);
            // Handle the error, such as clearing the invalid data or displaying an error message to the user
        }
    }
}, []);


  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
      const token = credentialResponse.credential;
      localStorage.setItem('token', token);
      const result = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      console.log(result,"res")
      const userProfile = {
        email: result?.email,
        name: result?.name,
        lastLogin: new Date().toISOString(), // Capture current login time
      };

      // Check if user already exists
      const existingUserIndex = users.findIndex(user => user.email === userProfile.email);
      if (existingUserIndex !== -1) {
        // Update existing user
        const updatedUsers = [...users];
        updatedUsers[existingUserIndex] = userProfile;
        setUsers(updatedUsers);
      } else {  
        var updatedUsers = [...users, userProfile];
        localStorage.setItem('token', token);
        setUsers(updatedUsers);
      }

      // Update users in local storage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      window.location.href = '/home';
    },
    onError: () => {
      console.log('Login Failed');
      alert('Login Failed. Please try again.');
    },
  });

  return (
    <div style={{ height: '100vh',width:"100%" }} className="container d-flex justify-content-center align-items-center">
      <div className="row justify-content-center ">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <img style={{ maxWidth: '400px' }} src="https://cdn3d.iconscout.com/3d/premium/thumb/drizzle-weather-7096832-5753008.png" alt="" />
              <h2 className="card-title text-center mb-4">Weather Reporter</h2>
              <div>
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
    </div>
  );
};

export default Login;
