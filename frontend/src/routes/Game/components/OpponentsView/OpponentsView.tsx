import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {
  Badge,
  styled as muiStyled,
  Typography,
  withStyles,
} from "@material-ui/core";
import RailIcon from "utils/RailIcon";
import mapTrackColorToHex from "../TrackCard/mapTrackColorToHex";
import { playerColorToHex } from "utils/constants";

const OpponentsViewWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.3rem;
  background-color: #94d9db;
`;

const OpponentCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 200px;
  background-color: rgba(255, 255, 255, 0.55);
  margin-right: 0.3rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
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
  const { playerId, players } = useSelector((state: RootState) => state.game);

  return (
    <OpponentsViewWrapper>
      {players && players.length > 1
        ? players.map((opponent) => {
            if (playerId !== opponent.playerId) {
              return (
                <OpponentCard key={opponent.playerId}>
                  <Typography
                    variant="h5"
                    style={{ textAlign: "center", fontWeight: "bolder" }}
                  >
                    {opponent.nickname}
                  </Typography>
                  <Lower>
                    <OpponentAvatar
                      style={{
                        color: playerColorToHex[opponent.color],
                      }}
                    />
                    <OpponentsInfo>
                      <TrackStats>
                        <TrackBadge
                          badgeContent={opponent.remainingTracks}
                          color="primary"
                        >
                          <RailIcon
                            color={playerColorToHex[opponent.color]}
                            style={{
                              fontSize: "2.5rem",
                            }}
                          />
                        </TrackBadge>
                      </TrackStats>
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        Points: {opponent.points}
                      </Typography>
                    </OpponentsInfo>
                  </Lower>
                </OpponentCard>
              );
            } else {
              return null;
            }
          })
        : "No opponents"}
    </OpponentsViewWrapper>
  );
};

export default OpponentsView;
