import { FC } from "react";
import styled from "styled-components";

import Map from "../../game/map/Map";
import PickInitTicketsModal from "./PickInitTicketsModal";

const GameWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Game: FC = () => {
  return (
    <GameWrapper>
      <PickInitTicketsModal />
      <Map />
    </GameWrapper>
  );
};

export default Game;
