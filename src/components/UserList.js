import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import RegistrationForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch users from the API
  const fetchUsers = () => {
    axios.get('https://localhost:7055/api/Users')
      .then(res => setUsers(res.data))
      .catch(err => alert('An error occurred while fetching users'));
  };

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setUserToEdit(user);
    setEditMode(true);
  };

  return (
    <div className="container mt-5">
      {editMode ? (
        <RegistrationForm userToEdit={userToEdit} setEditMode={setEditMode} />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.age}</td>
                <td>
                  <button type="button" className="btn btn-info" onClick={() => handleEdit(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;