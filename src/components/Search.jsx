import { useState } from "react";
import styled from "styled-components";
import { useAdsStore } from "../app/zustandStore";

const StyledSearch = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 1rem;
  justify-content: flex-end;
  /* tbd */
  /* background-color: red; */

  input {
    width: 16rem;
    border: 1px solid #007bff;
  }

  .search {
    background-color: #007bff;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .search:hover {
    background-color: #0069d9;
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { findInAds } = useAdsStore((state) => ({
    findInAds: state.findInAds,
  }));

  const handleSearch = () => {
    findInAds(searchTerm);
  };

  return (
    <StyledSearch>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search" onClick={handleSearch}>Buscar</button>
    </StyledSearch>
  );
};

export default Search;
