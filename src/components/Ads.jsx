// import { useEffect } from "react";
// import { useAdsStore } from "../app/zustandStore";
// import Ad from "./Ad";
// import styled from "styled-components";

// const AdsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   margin: 60px;
//   /* tbd */
//   background-color: cyan;
// `;

// const Ads = () => {
//   const { ads, partialAds, status, error, fetchAds } = useAdsStore((state) => ({
//     ads: state.ads,
//     partialAds: state.partialAds,
//     status: state.status,
//     error: state.error,
//     fetchAds: state.fetchAds,
//   }));

//   useEffect(() => {
//     fetchAds();
//   }, [fetchAds]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }

//   if (partialAds.length > 0) {
//     return (
//       <AdsContainer>
//         {partialAds.map((ad) => (
//           <Ad key={ad.id} ad={ad} />
//         ))}
//       </AdsContainer>
//     );
//   }

//   return (
//     <AdsContainer>
//       {ads.length > 0 ? (
//         ads.map((ad) => <Ad key={ad.id} ad={ad} />)
//       ) : (
//         <div>Anuncios no disponibles</div>
//       )}
//     </AdsContainer>
//   );
// };

// export default Ads;

import { useState, useEffect } from "react";
import { useAdsStore } from "../app/zustandStore";
import Ad from "./Ad";
import Pagination from "./Pagination";
import styled from "styled-components";

const AdsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 60px;
  /* tbd */
  background-color: cyan;
`;

const ITEMS_PER_PAGE = 6;

const Ads = () => {
  const { ads, partialAds, status, error, fetchAds } = useAdsStore((state) => ({
    ads: state.ads,
    partialAds: state.partialAds,
    status: state.status,
    error: state.error,
    fetchAds: state.fetchAds,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [currentAds, setCurrentAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentAds(
      partialAds.length > 0
        ? partialAds.slice(startIndex, endIndex)
        : ads.slice(startIndex, endIndex)
    );
  }, [ads, partialAds, currentPage]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const totalPages = Math.ceil(
    (partialAds.length > 0 ? partialAds.length : ads.length) / ITEMS_PER_PAGE
  );

  return (
    <>
      <AdsContainer>
        {currentAds.length > 0 ? (
          currentAds.map((ad) => <Ad key={ad.id} ad={ad} />)
        ) : (
          <div>Anuncios no disponibles</div>
        )}
      </AdsContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Ads;
