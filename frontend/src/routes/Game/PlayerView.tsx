import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Card, CardHeader, Typography } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import styled from "styled-components";

import { firstCap } from "utils/firstCap";
import TicketsModal from "./TicketsModal";

const PlayerViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 175px;
  background-color: green;
`;

const TracksWrapper = styled.div`
  //   width: 70%;
  display: flex;
  justify-content: center;
  background-color: green;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  background-color: pink;
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
    <PlayerViewContainer>
      {/* How to set isOpen to FALSE when Modal closes??? */}
      <TicketsModal modalState={[isTicketsModalOpen, setIsTicketsModalOpen]} />
      <TracksWrapper>
        {Object.values(trackCards).map((trackCard) => {
          return (
            trackCard.amount > 0 && (
              <Card
                key={`trackColor_${trackCard.color}`}
                style={{
                  width: "125px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
              >
                <CardHeader title={firstCap(trackCard.color)} />
                <CardHeader title={trackCard.amount} />
              </Card>
            )
          );
        })}
      </TracksWrapper>
      <Card
        style={{
          width: "125px",
          textAlign: "center",
          marginLeft: "10px",
          marginRight: "10px",
        }}
        onClick={openTicketsModal}
      >
        <CardHeader title="Tickets" />
        <Typography>{`Amount: ${tickets.length}`}</Typography>
      </Card>
      <PlayerWrapper>
        {/* <div style={{ display: "block", margin: "0 auto 0 auto" }}> */}
        <PersonOutlineIcon
          style={{
            color: `${color}`,
            height: "80px",
            width: "80px",
            display: "block",
            margin: "0 auto 0 auto",
          }}
        />
        <Typography variant="body2" style={{ margin: "0 auto 0 auto" }}>
          {nickname}
        </Typography>
        {/* <div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "40%",
            paddingBottom: "0.5em",
          }}
        >
          <div>
            <div
              style={{
                borderRadius: "50%",
                border: "5px solid #555",
                padding: "0.5em",
                textAlign: "center",
              }}
            >
              <Typography variant="h5">Tracks</Typography>
              <Typography variant="h5">{remainingTracks}</Typography>
            </div>
          </div>
          <div>
            <div
              style={{
                borderRadius: "50%",
                border: "5px solid #555",
                padding: "0.5em",
                textAlign: "center",
              }}
            >
              <Typography variant="h5">Points</Typography>
              <Typography variant="h5">{points}</Typography>
            </div>
          </div>
        </div>
        {/* </div> */}
      </PlayerWrapper>
    </PlayerViewContainer>
  );
};

export default PlayerView;
