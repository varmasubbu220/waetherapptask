import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserManager = () => {
  // Define state for user data
  const [users, setUsers] = useState([]);
  const emails = useSelector(state => state.user);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAILS;
  const navigate = useNavigate();  
  if(!(adminEmail==emails?.user?.email)){
    navigate('/home')
  }
  useEffect(() => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    } catch (error) {
        console.error('Error parsing stored users:', error);
        // Handle the error, such as setting default users or displaying an error message to the user
    }
}, []);

  // Function to handle user removal
  const removeUser = (email) => {
    // Filter out the user to be removed
    const updatedUsers = users.filter(user => user.email !== email);
    // Update state and local storage
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <>
     
      <div className="container mt-5">
      <Navbar />
        <div className="row">
          {users.map(user => (
            <div key={user.email} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  {user.email==emails?.user?.email? (
                    <p>You</p>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => removeUser(user.email)}
                    >
                      Remove User
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserManager;
