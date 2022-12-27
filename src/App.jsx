import React from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useAppContext } from "../contexts/placeContext";
import PlaceCard from "./components/PlaceCard";
import Navbar from "./components/Navbar";
import TopSearchbar from "./components/TopSearchbar";

const App = () => {
  const {
    filteredPlaces: places,
    status,
    isTopSearchbarOpen,
  } = useAppContext();

  if (status === "loading") {
    return (
      <h1 className="text-primary text-primary-color text-4xl text-center my-8">
        Loading...
      </h1>
    );
  }

  return (
    <>
      <ContainerStyled>
        <Navbar />
        <section>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-dark">Stays in Finland</h1>
            <span className="text-md text-gray">12+ stays</span>
          </div>
          {/* places */}

          {places?.length > 0 ? (
            <GridStyled>
              {places.map((place) => (
                <PlaceCard key={place.title} {...place}>
                  {place.title}
                </PlaceCard>
              ))}
            </GridStyled>
          ) : null}
        </section>
      </ContainerStyled>
      <AnimatePresence mode="popLayout">
        {isTopSearchbarOpen && <TopSearchbar />}
      </AnimatePresence>
    </>
  );
};

export default App;

export const ContainerStyled = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2em;
`;

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 2.5em;
  padding-bottom: 8em;
`;
