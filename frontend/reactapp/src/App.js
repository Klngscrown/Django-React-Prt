import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserForm } from './components/UserForm';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path='/userdetails/:id' element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
