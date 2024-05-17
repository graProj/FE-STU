import React, { useState } from 'react';
import { refreshTokenIfNeeded, signIn } from '../../api/login'; // signIn 함수와 refreshTokenIfNeeded 함수를 가져옵니다.
import styled from 'styled-components';
import LoadingIndicator from '../../hooks/loading';

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // 폼 제출 시 로딩 상태를 true로 변경합니다.
      await signIn(formData, setIsLoading); // signIn 함수에 setIsLoading을 전달하여 로딩 상태를 변경합니다.
      await refreshTokenIfNeeded()
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 로딩 상태를 다시 false로 변경합니다.
    }
  };

  return (
    <Container>
      로그인
      <FR onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Btn type="submit" disabled={isLoading}>로그인</Btn>
      </FR>
      {isLoading && <LoadingIndicator />}
    </Container>
  );
}

const Btn = styled.button`
  width: 200px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: #fff;
  background-color: #3b82f6;
  transition: background-color 0.3s, color 0.3s;

  &:hover,
  &:focus {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #3b82f6;
  }
`;

const Container = styled.div`
  width: 50%;
  height: 50%;
`;

const FR = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid white;
  width: 80%;
  height: 30px;
  color: white;
`;
