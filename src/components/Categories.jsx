import { useEffect } from "react";
import { useAdsStore } from "../app/zustandStore";
import styled from "styled-components";

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 1rem; */
  padding: 1rem;
  height: 50%;
  /* border: 1px solid #ccc; */
  /* border-radius: 5px; */
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
  /* background-color: #f9f9f9; */
  .title {
    font-weight: bold;
    color: #f5f5f5;
  }
  .categories-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    button {
      background-color: #007bff;
      /* color: white; */
      color: #f5f5f5;
      padding: 0.5rem;
      border: none;
      min-width: 6rem;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const Categories = () => {
  const { categories, fetchCategories } = useAdsStore((state) => state);

  const { filterInAds } = useAdsStore((state) => ({
    filterInAds: state.filterInAds,
  }));

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <StyledCategories>
      <h2 className="title">Categorias</h2>
      <ul className="categories-list">
        {categories?.map((category) => (
          <li key={category.id}>
            <button onClick={() => filterInAds(category.id)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </StyledCategories>
  );
};

export default Categories;
