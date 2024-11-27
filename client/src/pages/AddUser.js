import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    email: '',
    userNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', formData);
      alert('User added successfully');
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add User</h1>
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="dateOfBirth" type="date" placeholder="Date of Birth" onChange={handleChange} />
      <input name="address1" placeholder="Address Line 1" onChange={handleChange} />
      <input name="address2" placeholder="Address Line 2" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="postalCode" placeholder="Postal Code" onChange={handleChange} />
      <input name="country" placeholder="Country" onChange={handleChange} />
      <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <textarea name="userNotes" placeholder="User Notes" onChange={handleChange} />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
