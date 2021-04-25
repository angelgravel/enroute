import { FC } from "react";
import styled from "styled-components";

import Map from "../game/map/Map";

const GameRouteWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const GameRoute: FC = () => {
  return (
    <GameRouteWrapper>
      <Map />
    </GameRouteWrapper>
  );
};

export default GameRoute;
