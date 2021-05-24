import React, { FC, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Badge,
  styled as muiStyled,
  Typography,
  withStyles,
  Divider,
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import RailIcon from "utils/RailIcon";
import { playerColorToHex } from "utils/constants";

import { PlayerClient } from "@typeDef/types";

const OpponentsViewWrapper = styled(motion.div)`
  /* grid-area: opponents; */
  /* height: 10vh; */
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.7rem;
  z-index: 1000;
  max-width: 100vw;
  /* overflow: auto; */
`;

const OpponentCard = styled(motion.div)`
  position: relative;
  padding: 0.3rem;
  margin: 0.4rem 1rem;
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

const Scrollable = styled.div`
  grid-area: trackCards;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: no-wrap;
  max-width: calc(100vw - 18rem);
  overflow: auto;
  padding-right: 1rem;
`;

const OpponentsView: FC = () => {
  const { playerId, players, currentPlayer } = useSelector(
    (state: RootState) => state.game,
  );
  const [myInformation, setMyInformation] = useState<PlayerClient>();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const ScrollableOrNot = isExpanded ? Scrollable : Fragment;

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
        animate={
          currentPlayer === player.playerId || isMe ? "active" : "inactive"
        }
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
        {isMe && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: "translate(-30%, -30%)",
              padding: "0.5rem",
              borderRadius: "10%",
              backgroundColor: "#f9b1cd",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                color: "#fff",
                filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.4))",
              }}
            >
              You
            </span>
          </div>
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
      <motion.div
        variants={{
          expanded: {
            width: "fit-content",
            x: 0,
            opacity: 1,
            display: "flex",
          },
          notExpanded: {
            width: 0,
            x: 50,
            opacity: 0,
            display: "flex",
            transitionEnd: {
              display: "none",
            },
          },
        }}
        initial={false}
        animate={isExpanded ? "expanded" : "notExpanded"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Divider
          orientation="vertical"
          flexItem
          style={{ margin: "10px 1.5rem", width: "2px" }}
        />
        <ScrollableOrNot>
          {players && players.length > 1 ? (
            players
              .filter((player) => player.playerId !== playerId)
              .map((opponent) => generateOpponentCard(opponent, false))
          ) : (
            <Typography
              style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}
              variant="body1"
            >
              No opponents
            </Typography>
          )}
        </ScrollableOrNot>
      </motion.div>
      <IconButton
        aria-label={isExpanded ? "Shrink menu" : "Expand menu"}
        // style={{ fontSize: "2rem" }}
        style={{
          backgroundColor: "#fff",
          marginLeft: "1rem",
          filter: "drop-shadow(0 0 4px rgba(50, 50, 50, 0.3))",
        }}
        color="secondary"
        size="small"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </OpponentsViewWrapper>
  );
};

export default OpponentsView;
