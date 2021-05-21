import { FC, forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { colorToHex } from "utils/constants";
import routesInfo, { RouteInfo } from "./routesInfo";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { RootState } from "redux/store";
import { setChosenRoute } from "redux/chosenRoute";
import { PlayerColor, Route as RouteType, TrackColor } from "@typeDef/types";

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
  id: RouteType;
  routeInfo: RouteInfo;
};
const Route = forwardRef<any, RouteProps>(({ id, routeInfo }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { routes, trackCards } = useSelector((state: RootState) => state.game);
  const color = colorToHex[routeInfo.color];
  const tracks = routeInfo.tracks;
  const bridges = routeInfo.bridges;

  const [builtBy, setBuiltBy] = useState<PlayerColor | null>(null);

  const handleClick = () => {
    try {
      if (!trackCards || !routes || !routes[id]) throw new Error("");

      if (routes[id].builtBy !== null) {
        throw new Error("already_built");
      }

      const amountBridges = trackCards["bridge"].amount;

      if (amountBridges < routes[id].bridges) {
        throw new Error("not_enough_bridges");
      }

      const noBridges = Object.values(trackCards).filter(
        ({ color }) => color !== "bridge",
      );

      if (
        (routes[id].color === "any" &&
          !noBridges.some(
            (trackCard) =>
              trackCard.amount + amountBridges >= routes[id].length,
          )) ||
        (routes[id].color !== "any" &&
          trackCards[routes[id].color as TrackColor].amount + amountBridges <
            routes[id].length)
      ) {
        throw new Error("not_enough_track_cards");
      }

      const { color, bridges, tracks } = routeInfo;

      dispatch(
        setChosenRoute({
          id: id,
          builtBy: null,
          color,
          bridges: bridges.length,
          length: tracks.length,
        }),
      );
    } catch (error) {
      console.log(error);
      switch (error.message) {
        case "already_built":
          enqueueSnackbar(`Already built by ${routes[id].builtBy}!`, {
            variant: "error",
          });
          break;
        case "not_enough_track_cards":
          enqueueSnackbar(`Not enough track cards to build that route!`, {
            variant: "error",
          });
          break;
        case "not_enough_bridges":
          enqueueSnackbar(`Not enough bridges to build that route!`, {
            variant: "error",
          });
          break;
        default:
          enqueueSnackbar(`Error!`, {
            variant: "error",
          });
          break;
      }
    }
  };

  useEffect(() => {
    if (routes && routes[id]) {
      setBuiltBy(routes[id].builtBy);
    }
  }, [routes]);

  return (
    <TrackGroup
      ref={ref}
      id={id}
      onClick={() => {
        handleClick();
      }}
    >
      {tracks.map((track) => (
        <TrackRect
          {...track}
          rx="3"
          fill={builtBy || color[0]}
          stroke={builtBy || color[1]}
        />
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
        <Route id={id as RouteType} routeInfo={routeInfo} />
      ))}
    </g>
  );
};

export default Routes;
