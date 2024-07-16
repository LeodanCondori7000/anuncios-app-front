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
      <button onClick={handleSearch}>Buscar</button>
    </StyledSearch>
  );
};

export default Search;
