import { FC } from "react";
import styled from "styled-components";

import TrackCardModal from "./components/TrackCardModal";
import Map from "./components/Map";
import PickInitTicketsModal from "./components/PickInitTicketsModal";
import PlayerView from "./components/PlayerView";
import OpponentsView from "./components/OpponentsView";
import TrackCardView from "./components/TrackCardView";

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MidWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// const OpponentsViewWrapper = styled.div`
//   height: 175px;
//   background-color: magenta;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// Placekeeper
// const OpponentsView: FC = () => {
//   return <OpponentsViewWrapper>Opponents View</OpponentsViewWrapper>;
// };

const Game: FC = () => {
  return (
    <GameWrapper>
      <PickInitTicketsModal />
      <TrackCardModal />
      <TopWrapper>
        <MidWrapper>
          <OpponentsView />
          <Map />
        </MidWrapper>
        <TrackCardView />
      </TopWrapper>
      <PlayerView />
    </GameWrapper>
  );
};

export default Game;
