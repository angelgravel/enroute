import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Badge, Typography } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import styled from "styled-components";

import TicketsModal from "../TicketsModal";
import TrackCard from "../TrackCard";
import BackCard from "routes/Game/components/BackCard";
import { playerColorToHex } from "utils/constants";

const PlayerViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 175px;
  background-color: #dedede;
`;

const TracksWrapper = styled.div`
  max-width: 70%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const TicketsContainer = styled.div`
  height: fit-content;
`;

// TODO: Change to responsive
const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 300px;
  background-color: pink;
`;

const TracksAndPoints = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 0.5em;
`;

// TODO: Make circular and responsive
const Ring = styled.div`
  border: 5px solid #555;
  border-radius: 50%;
  width: 100%;
  padding-top: 50%;
  text-align: center;
`;

const PlayerView: FC = () => {
  const {
    trackCards,
    tickets,
    color,
    nickname,
    points,
    remainingTracks,
  } = useSelector((state: RootState) => state.game);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);

  const openTicketsModal = () => {
    setIsTicketsModalOpen(true);
  };

  return (
    <PlayerViewWrapper>
      <TicketsModal modalState={[isTicketsModalOpen, setIsTicketsModalOpen]} />
      <TracksWrapper>
        {Object.values(trackCards).map((trackCard) => {
          return (
            trackCard.amount > 0 && (
              <Badge
                badgeContent={trackCard.amount}
                color="primary"
                key={`trackColor_${trackCard.color}`}
                style={{ margin: "0.25em 0.25em 0 0.25em" }}
              >
                <TrackCard color={trackCard.color} />
              </Badge>
            )
          );
        })}
      </TracksWrapper>
      <Badge
        badgeContent={tickets.length}
        color="primary"
        style={{ margin: "0.25em 1em 0 1em" }}
      >
        <TicketsContainer onClick={openTicketsModal}>
          <BackCard />
        </TicketsContainer>
      </Badge>
      <PlayerWrapper>
        <PersonOutlineIcon
          style={{
            color: color ? playerColorToHex[color] : "transparent",
            display: "block",
            height: "80px",
            width: "80px",
            margin: "0 auto 0 auto",
          }}
        />
        <Typography variant="body2" style={{ margin: "0 auto 0 auto" }}>
          {nickname}
        </Typography>
        <TracksAndPoints>
          <Ring>
            <Typography variant="h5">Tracks</Typography>
            <Typography variant="h5">{remainingTracks}</Typography>
          </Ring>
          <Ring>
            <Typography variant="h5">Points</Typography>
            <Typography variant="h5">{points}</Typography>
          </Ring>
        </TracksAndPoints>
      </PlayerWrapper>
    </PlayerViewWrapper>
  );
};

export default PlayerView;
