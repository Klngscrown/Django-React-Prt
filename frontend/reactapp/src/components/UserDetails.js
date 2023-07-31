import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const UserDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error:", error.message);
        console.error("Response:", error.response);
        console.error("Request:", error.request);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Age:</strong> {user.age}
      </div>
      <div>
        <strong>Photo:</strong>
        <img
          src={user.photo}
          alt="사진불러오기 실패!"
          style={{ width: '200px', height: 'auto' }}
        />
      </div>
      <br /> {/* 여백을 추가하기 위해 <br /> 태그 사용 */}
      <button type="button" onClick={() => navigate('/userlist')}>
        목록으로 이동
      </button>
    </div>
  );
};

export default UserDetails;
