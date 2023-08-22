import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const RegistrationForm = ({ userToEdit, setEditMode }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    age: ''
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userToEdit) {
      axios.put(`https://localhost:7055/api/Users/${userToEdit.id}`, user)
        .then(res => {
          alert('User updated successfully');
          setEditMode(false);
        })
        .catch(err => {
          alert('An error occurred while updating the user');
        });
    } else {
      axios.post('https://localhost:7055/api/Users', user)
        .then(res => {
          alert('User saved successfully!');
          setUser({
            name: '',
            email: '',
            phone: '',
            age: ''
          });
        })
        .catch(err => {
          alert('An error occurred while saving the user');
        });
    }
  };

  return (
   
    <form onSubmit={handleSubmit} className="bg-light p-5 rounded">
       <h1>registration form</h1>
      <div className="container mt-2">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={user.name} onChange={handleChange} required />
      </div>
      <div className="container mt-2">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" value={user.email} onChange={handleChange} required />
      </div>
      <div className="container mt-2">
        <label htmlFor="phone">Phone</label>
        <input type="tel" className="form-control" id="phone" name="phone" placeholder="Enter your phone number" value={user.phone} onChange={handleChange} required />
      </div>
      <div className="container mt-2">
        <label htmlFor="age">Age</label>
        <input type="number" className="form-control" id="age" name="age" placeholder="Enter your age" min="18" max="100" value={user.age} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary mr-5 mt-2">{userToEdit ? 'Update' : 'Save'}</button>
      {userToEdit && <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={() => setEditMode(false)}>Cancel</button>}
    </form>
  );
};

export default RegistrationForm;