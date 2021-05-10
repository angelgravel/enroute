import React, { FC, forwardRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { colorToHex } from "../../../utils/constants";
import routesInfo, { RouteInfo } from "./routesInfo";

const TrackRect = styled(motion.rect)`
  stroke-miterlimit: 10;
`;

const BridgeSvg = styled(motion.path)`
  fill: #262626;
`;
type BridgeProps = {
  d: string;
};
const Bridge: FC<BridgeProps> = ({ d }) => (
  <BridgeSvg d={d} transform="translate(0)" />
);

const TrackGroup = styled(motion.g)`
  cursor: pointer;
  filter: brightness(1) opacity(0.95);
  transition: filter 150ms ease;

  &:hover {
    filter: brightness(0.8) opacity(1);
  }
`;

type RouteProps = {
  id: string;
  routeInfo: RouteInfo;
};
const Route = forwardRef<any, RouteProps>(({ id, routeInfo }, ref) => {
  const color = colorToHex[routeInfo.color];
  const tracks = routeInfo.tracks;
  const bridges = routeInfo.bridges;

  return (
    <TrackGroup ref={ref} id={id}>
      {tracks.map((track) => (
        <TrackRect {...track} rx="3" fill={color[0]} stroke={color[1]} />
      ))}
      {bridges.map((d) => (
        <Bridge d={d} />
      ))}
    </TrackGroup>
  );
});

const Routes: FC = () => {
  return (
    <g id="tracks">
      {Object.entries(routesInfo).map(([id, routeInfo]) => (
        <Route id={id} routeInfo={routeInfo} />
      ))}
    </g>
  );
};

export default Routes;
