import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import { motion } from "framer-motion";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {
  Badge,
  styled as muiStyled,
  Typography,
  withStyles,
  Divider,
} from "@material-ui/core";
import RailIcon from "utils/RailIcon";
import mapTrackColorToHex from "../TrackCard/mapTrackColorToHex";
import { playerColorToHex } from "utils/constants";

import logo from "../../../../assets/location.gif";
import { PlayerClient } from "@typeDef/types";

const OpponentsViewWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.3rem;
  background-color: #94d9db;
`;

const SHADOW =
  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
type OpponentCardProps = {
  _currentPlayer?: boolean;
};

const OpponentCard = styled(motion.div)<OpponentCardProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 200px;
  background-color: rgba(255, 255, 255, 0.55);
  margin: 0 0.3rem 0 0.3rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  box-shadow: ${({ _currentPlayer }) => (_currentPlayer ? SHADOW : 0)};
`;

const Lower = styled.div`
  display: flex;
  align-items: space-between;
  flex-grow: 2;
`;

const TrackBadge = withStyles({
  badge: {
    fontSize: ".75rem",
    height: "1.75rem",
    minWidth: "1.75rem",
    padding: 0,
  },
})(Badge);

const OpponentAvatar = muiStyled(PersonOutlineIcon)({
  fontSize: "4rem",
  alignSelf: "center",
  marginBottom: "0.3rem",
});

const OpponentsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 2;
`;

const TrackStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OpponentsView: FC = () => {
  const { playerId, players, currentPlayer } = useSelector(
    (state: RootState) => state.game,
  );
  const [myInformation, setMyInformation] = useState<PlayerClient>();

  useEffect(() => {
    const me = players.find((player) => player.playerId === playerId);
    setMyInformation(me);
  }, []);

  const generateOpponentCard = (player: PlayerClient) => {
    return (
      <OpponentCard
        key={player.playerId}
        _currentPlayer={currentPlayer === player.playerId}
        variants={{
          pulse: {
            scale: [1, 1.04, 1, 1.06, 1, 1],
            transition: {
              delay: 2,
              duration: 2,
              repeat: Infinity,
            },
          },
        }}
        animate={currentPlayer === player.playerId ? "pulse" : false}
      >
        <Typography
          variant="h5"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          {player.nickname}
        </Typography>

        <Lower>
          <OpponentAvatar
            style={{
              color: playerColorToHex[player.color],
            }}
          />
          <OpponentsInfo>
            <TrackStats>
              <TrackBadge badgeContent={player.remainingTracks} color="primary">
                <RailIcon
                  color={playerColorToHex[player.color]}
                  style={{
                    fontSize: "2.5rem",
                  }}
                />
              </TrackBadge>
            </TrackStats>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Points: {player.points}
            </Typography>
          </OpponentsInfo>
        </Lower>
      </OpponentCard>
    );
  };

  return (
    <OpponentsViewWrapper>
      {myInformation ? generateOpponentCard(myInformation) : null}
      <Divider
        orientation="vertical"
        flexItem
        style={{ margin: "10px", width: "2px" }}
      />
      {players && players.length > 1
        ? players.map((opponent) => {
            if (playerId !== opponent.playerId) {
              return generateOpponentCard(opponent);
            }
          })
        : "No opponents"}
    </OpponentsViewWrapper>
  );
};

export default OpponentsView;
