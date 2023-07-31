
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  
  const handleClick = () => {
    //상세 페이지로 이동
    window.location.href = `http://localhost:3000/userdetails/${user.id}`;
  };
  //console.log(user.id);

  return (
    <li>
      <div 
        onClick={handleClick} 
        style={{ 
          cursor: 'pointer',
          border: '2px solid black',
          padding: '10px',
        }}
      >
          Name: {user.name}  Age: {user.age}<br />
      </div>
    </li>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      let apiUrl = 'http://localhost:8000/api/users/search/';

      const response = await axios.get(apiUrl, {
        params: {
            name: searchQuery,
        },
      });
      //console.log(searchQuery);

      setUsers(response.data);

      //console.log(response.data);
      console.log(users);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    fetchUsers();
  };

  return (
    <div>
      <div>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by name" />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {users && users.length > 0 ? (
            users.map((user) => (
              <User key={user.id} user={{ ...user, id: user.id}} />
            ))
          ) : (
            <div>No matching users found!</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserList;