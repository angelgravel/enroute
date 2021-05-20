import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Rail from "./Rail";
import { TrackColor } from "@typeDef/types";
import mapTrackColorToHex from "./mapTrackColorToHex";
import BasicCard from "../BasicCard";

const TrackCardWrapper = styled(motion.svg)`
  width: 100%;
  height: 100%;
`;

const Bg1 = styled(motion.rect)``;

const Bg2 = styled(Bg1)`
  stroke-width: 3px;
  stroke-miterlimit: 10;
`;

const Bg3 = styled(Bg2)`
  stroke-width: 2px;
`;

const Circle = styled(motion.circle)`
  stroke-miterlimit: 10;
  stroke-width: 2px;
`;

const BridgeGradient: FC = () => (
  <>
    <linearGradient
      id="linear-gradient"
      gradientUnits="userSpaceOnUse"
      x1="9.63"
      y1="128.2"
      x2="161.45"
      y2="128.2"
    >
      <stop offset="0%" stopColor="#f08579" />
      <stop offset="100%" stopColor="#fae69a" />
    </linearGradient>
    <linearGradient
      id="linear-gradient-2"
      x1="26.87"
      y1="128.2"
      x2="144.21"
      y2="128.2"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#f1c5d6" />
      <stop offset="100%" stopColor="#fae69a" />
    </linearGradient>
    <linearGradient
      id="linear-gradient-3"
      x1="16.15"
      y1="128.2"
      x2="154.93"
      y2="128.2"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#cee2d7" />
      <stop offset="100%" stopColor="#fae69a" />
    </linearGradient>
  </>
);

type TrackCardProps = {
  color: TrackColor;
  style?: React.CSSProperties;
};
const TrackCard: FC<TrackCardProps> = ({ color, style }) => {
  return (
    <BasicCard style={style}>
      <TrackCardWrapper
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 171.08 256.12"
      >
        {color === "bridge" && <BridgeGradient />}
        <Bg1
          fill={mapTrackColorToHex[color].bg1.fill}
          x="9.71"
          y="10.99"
          width="151.83"
          height="234.41"
        />
        <Bg2
          fill={mapTrackColorToHex[color].bg2.fill}
          stroke={mapTrackColorToHex[color].bg2.stroke}
          x="20.44"
          y="29.86"
          width="130.37"
          height="196.67"
        />
        <Bg3
          fill={mapTrackColorToHex[color].bg3.fill}
          stroke={mapTrackColorToHex[color].bg3.stroke}
          x="26.95"
          y="37.85"
          width="117.33"
          height="180.69"
        />
        <Circle
          fill={mapTrackColorToHex[color].circle.fill}
          stroke={mapTrackColorToHex[color].circle.stroke}
          cx="85.62"
          cy="128.2"
          r="69.39"
        />
        <Rail color={mapTrackColorToHex[color].rail.fill} />
      </TrackCardWrapper>
    </BasicCard>
  );
};

export default TrackCard;
