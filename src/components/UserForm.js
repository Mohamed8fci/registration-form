import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          alert('User updated successfully!');
          setEditMode(false);
        })
        .catch(err => {
          alert('An error occurred while updating the user.');
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
          alert('An error occurred while saving the user.');
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required/>
      <input type="tel" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} required/>
      <input type="number" name="age" placeholder="Age" min="18" max="100" value={user.age} onChange={handleChange} required/>
      <button type="submit">{userToEdit ? 'Update' : 'Save'}</button>
      {userToEdit && <button type="button" onClick={() => setEditMode(false)}>Cancel</button>}
    </form>
  );
};

export default RegistrationForm;