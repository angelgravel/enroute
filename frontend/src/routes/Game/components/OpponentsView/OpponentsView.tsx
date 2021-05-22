import React, { FC, useEffect, useState } from "react";
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
import { playerColorToHex } from "utils/constants";

import { PlayerClient } from "@typeDef/types";

const OpponentsViewWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.7rem;
  background-color: #94d9db;
`;

const OpponentCard = styled(motion.div)`
  position: relative;
  margin: 0 1rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Lower = styled.div`
  display: flex;
  align-items: flex-start;
  flex-grow: 2;
  margin: 0.2rem 0.9rem 0 0;
`;

const TrackBadge = withStyles({
  badge: {
    fontSize: ".75rem",
    height: "1.65rem",
    minWidth: "1.65rem",
    padding: 0,
    transform: "translateX(45%) translateY(-15%)",
  },
})(Badge);

const OpponentAvatar = muiStyled(PersonOutlineIcon)({
  fontSize: "4rem",
  alignSelf: "center",
  marginBottom: "0.3rem",
});

const CurrentPlayerBadgeText = styled(motion.div)`
  font-size: 0.7rem;
  text-align: center;
  background-color: #f9b1cd;
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 0.3rem;
  position: absolute;
  bottom: -0.3rem;
  right: -2rem;
`;

const OpponentsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 2;
  margin-left: 0.5rem;
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

  const generateOpponentCard = (player: PlayerClient, isMe: boolean) => {
    return (
      <OpponentCard
        key={player.playerId}
        variants={{
          active: {
            scale: 1,
            filter: `drop-shadow(0 0 0.2rem ${playerColorToHex[player.color]})`,
            backgroundColor: "rgba(255, 255, 255, 1)",

            transition: {
              duration: 0.2,
            },
          },
          inactive: {
            scale: 0.9,
            filter: `drop-shadow(0 0 0 rgba(0,0,0,0))`,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            transition: {
              duration: 0.2,
            },
          },
        }}
        animate={currentPlayer === player.playerId ? "active" : "inactive"}
      >
        {currentPlayer === player.playerId && (
          <CurrentPlayerBadgeText
            variants={{
              pulse: {
                scale: [0.9, 1.05, 0.9, 1, 0.9, 0.9],

                transition: {
                  duration: 1.5,
                  delay: 3,
                  repeat: Infinity,
                },
              },
              noPulse: {
                scale: 1,
              },
            }}
            animate={currentPlayer === player.playerId ? "pulse" : "noPulse"}
          >
            {isMe ? "Your turn" : "Current player"}
          </CurrentPlayerBadgeText>
        )}
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
              {player.points}p
            </Typography>
          </OpponentsInfo>
        </Lower>
      </OpponentCard>
    );
  };

  return (
    <OpponentsViewWrapper>
      {myInformation ? generateOpponentCard(myInformation, true) : null}
      <Divider
        orientation="vertical"
        flexItem
        style={{ margin: "10px", width: "2px" }}
      />
      {players && players.length > 1
        ? players.map((opponent) => {
            if (playerId !== opponent.playerId) {
              return generateOpponentCard(opponent, false);
            }
          })
        : "No opponents"}
    </OpponentsViewWrapper>
  );
};

export default OpponentsView;
