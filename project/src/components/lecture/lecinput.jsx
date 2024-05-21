import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import useDebounce from '../../hooks/Debounce';

export default function LecInput ({onSearch}){
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchText = useDebounce(searchTerm, 600);
    useEffect(() => {
        onSearch(debouncedSearchText);
      }, [debouncedSearchText]);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
    return (
        <TopContainer>
            <InputContainer>
            <StyledInput type="text" placeholder="강의명 필터링" onChange={handleSearch} />
            </InputContainer>
        
        </TopContainer>
    );
}

const TopContainer = styled.div`
  display:flex;
  justify-content:space-around;
  align-items:center;
  height:70px;
  `;
const InputContainer = styled.div`
  width:40%;
  display:flex;
  height:40px;
`;
const StyledInput = styled.input`
  width:100%;
  border: 1px solid #0ea8f09b;
  border-radius:10px;
  padding-left:10px;
  height:100%;
`;
