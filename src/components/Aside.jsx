import Categories from "./Categories";
import Publish from "./Publish";
import styled from "styled-components";

const AsideStyled = styled.aside`
  background-color: orange;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Aside = () => {
  return (
    <AsideStyled>
      <Categories />
      <Publish />
    </AsideStyled>
  );
};
export default Aside;
