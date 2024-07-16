import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .content {
    flex: 1;
    padding: 1rem 2rem;
  }
`;

export default function Layout() {
  return (
    <StyledLayout>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </StyledLayout>
  );
}
