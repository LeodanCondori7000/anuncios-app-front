import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #74c0fc;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p className="tetx">&#169; 2024 ANUNCIOS</p>
    </StyledFooter>
  );
}
