import React, { FC, forwardRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { ColorToHex } from "utils/constants";
import tracksInfo, { TrackInfo } from "./tracksInfo";

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

type TrackProps = {
  id: string;
  trackInfo: TrackInfo;
};
const Track = forwardRef<any, TrackProps>(({ id, trackInfo }, ref) => {
  const color = ColorToHex[trackInfo.color];
  const tracks = trackInfo.tracks;
  const bridges = trackInfo.bridges;

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

const Tracks: FC = () => {
  return (
    <g id="tracks">
      {Object.entries(tracksInfo).map(([id, trackInfo]) => (
        <Track id={id} trackInfo={trackInfo} />
      ))}
    </g>
  );
};

export default Tracks;
