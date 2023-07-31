import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const UserForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userid = uuidv4();

    const formData = new FormData();
    formData.append('id', userid);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('photo', photo);

    // FormData 객체의 값을 저장할 객체
    const formDataValues = {};

    // for (let pair of formData.entries()) {
    //   formDataValues[pair[0]] = pair[1];
    // }

    // console.log(formDataValues);

    try {
      await axios.post('http://localhost:8000/api/users/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 저장 성공 시 처리 로직
      console.log('User data saved successfully');
      navigate('/userlist');
      // 저장 후 필요한 동작 수행

      // 폼 리셋
      setName('');
      setAge('');
      setPhoto(null);
    } catch (error) {
      console.error(error);
      // 저장 실패 시 처리 로직
      console.log('User data saved FAIL!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleNameChange}
        required
      /><br></br>

      <label htmlFor="age"> Age:  </label>
      <input
        type="number"
        id="age"
        name="age"
        value={age}
        onChange={handleAgeChange}
        required
      /><br></br>

      <label htmlFor="photo">Photo: </label>
      <input
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        onChange={handlePhotoChange}
        required
      /><br></br>

      <button type="submit">저장</button><br></br>
      <button type="button" onClick={() => navigate('/userlist')}>목록으로 이동</button> {/* 새로운 목록으로 가는 버튼 */}
    </form>
  );
};

//export { UserForm };