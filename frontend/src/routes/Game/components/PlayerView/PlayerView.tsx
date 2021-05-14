import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Badge, Card, CardHeader, Typography } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import styled from "styled-components";
import { styled as styledAPI } from "@material-ui/core/styles";

import { firstCap } from "utils/firstCap";
import TicketsModal from "../TicketsModal";

const PlayerViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 175px;
  background-color: #dedede;
`;

const TracksWrapper = styled.div`
  //   width: 70%;
  display: flex;
  justify-content: center;
  // background-color: green;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  // background-color: pink;
`;

const TracksAndPoints = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 40%;
  padding-bottom: 0.5em;
`;

const Ring = styled.div`
  text-align: center;
  border: 5px solid #555;
  border-radius: 50%;
  padding: 0.5em;
`;

const StyledCard = styledAPI(Card)({
  width: "125px",
  textAlign: "center",
});

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
              >
                <StyledCard style={{ marginLeft: "0.5em" }}>
                  <CardHeader
                    title={firstCap(trackCard.color)}
                    style={{ paddingTop: "50%" }}
                  />
                </StyledCard>
              </Badge>
            )
          );
        })}
      </TracksWrapper>
      <Badge badgeContent={tickets.length} color="primary">
        <StyledCard onClick={openTicketsModal}>
          <CardHeader title="Tickets" style={{ paddingTop: "50%" }} />
        </StyledCard>
      </Badge>
      <PlayerWrapper>
        <PersonOutlineIcon
          style={{
            color: `${color}`,
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
