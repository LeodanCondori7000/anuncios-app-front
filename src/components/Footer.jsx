import styled from "styled-components";

const StyledFooter = styled.footer`
  /* background-color: #74c0fc; */
  background-color: #007bff;
  font-weight: bold;
  font-size: 1.5rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fab005;
`;

export default function Footer() {
  return (
    <StyledFooter>
      {/* <p className="tetx">&#169; 2024 ANUNCIOS</p> */}
      <p className="tetx">&copy; 2024 ANUNCIOS, Todos los Derechos Reservados</p>
    </StyledFooter>
  );
}
