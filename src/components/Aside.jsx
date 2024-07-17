import Categories from "./Categories";
import Publish from "./Publish";
import styled from "styled-components";

const AsideStyled = styled.aside`
  background-color: #fab005;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;
  height: 65vh;
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
