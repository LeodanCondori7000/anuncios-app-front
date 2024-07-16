import styled from "styled-components";

import Search from "../components/Search";
import Aside from "../components/Aside";
import Bulk from "../components/Bulk";

const StyledLanding = styled.div`
  margin: 0 auto;
  max-width: 1536px;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */

  /* tbd */
  /* background-color: yellow; */

  .section {
    display: flex;
    /* gap: 8rem; */
  }

`;

const Landing = () => {
  return (
    <StyledLanding>
      <Search />
      <section className="section">
        <Aside />
        <Bulk />
      </section>
    </StyledLanding>
  );
};

export default Landing;
