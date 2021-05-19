import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import { useSnackbar } from "notistack";

import Map from "../../game/map/Map";
import PickInitTicketsModal from "./PickInitTicketsModal";
import TrackCardModal from "./TrackCardModal";

const GameWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Game: FC = () => {
  return (
    <GameWrapper>
      <PickInitTicketsModal />
      <TrackCardModal />
      <Map />
    </GameWrapper>
  );
};

export default Game;
