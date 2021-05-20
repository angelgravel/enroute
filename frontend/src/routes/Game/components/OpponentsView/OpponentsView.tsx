import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Badge } from "@material-ui/core";

const OpponentsViewWrapper = styled.div`
  height: 175px;
  background-color: magenta;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OpponentWrapper = styled.div`
  display: flex;
  background-color: pink;
  border: 5px solid rgb(159, 159, 159);
  border-radius: 5%;
`;

const LeftHalf = styled.div`
  display: flex;
  flex-direction: column;
  background-color: cyan;
`;

const OpponentsView: FC = () => {
  const { playerId, players } = useSelector((state: RootState) => state.game);

  return (
    <OpponentsViewWrapper>
      {/* <div>Opponents View</div> */}
      <div>
        {players && players.length > 1
          ? players.map((opponent) => {
              console.log(opponent);
              if (playerId !== opponent.playerId) {
                return (
                  <OpponentWrapper key={opponent.playerId}>
                    <LeftHalf>
                      <Badge
                        badgeContent={opponent.remainingTracks}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        color="primary"
                      >
                        <PersonOutlineIcon
                          style={{
                            color: `${opponent.color}`,
                            display: "block",
                            height: "60px",
                            width: "60px",
                            margin: "0 auto 0 auto",
                          }}
                        />
                      </Badge>
                      <div>POINTS</div>
                    </LeftHalf>
                    <div
                      style={{
                        textAlign: "center",
                        margin: "auto 0 auto 0",
                      }}
                    >
                      {opponent.nickname}
                    </div>
                  </OpponentWrapper>
                );
              }
            })
          : "No opponents"}
      </div>
    </OpponentsViewWrapper>
  );
};

export default OpponentsView;
