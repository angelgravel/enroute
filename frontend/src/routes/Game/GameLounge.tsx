import { FC, useContext, useEffect } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import logo from "../../assets/location.gif";

import { socketContext } from "../../context/socket";
import {
  SocketResponse,
  AddSocketPayload,
  AddSocketEmit,
} from "@typeDef/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
`;

type GameLoungeProps = {};
const GameLounge: FC<GameLoungeProps> = ({}) => {
  const socket = useContext(socketContext);
  const { players, gameToken, playerId } = useSelector(
    (state: RootState) => state.game,
  );

  useEffect(() => {
    if (socket) {
      socket.on("add_socket", (response: SocketResponse<AddSocketPayload>) => {
        if (!response.success) {
          console.log(response.payload);
          return;
        }
      });
    }

    return () => {
      socket.off("add_socket");
    };
  }, [socket]);

  useEffect(() => {
    if (socket && playerId && gameToken) {
      const addSocketEmit: AddSocketEmit = {
        gameToken,
        playerId,
      };
      socket.emit("add_socket", addSocketEmit);
    }
  }, [socket, playerId, gameToken]);

  const handleStartGame = () => {};

  // TODO: Check if game exists

  return (
    <Container>
      <img src={logo} style={{ height: "80px" }} alt="logo" />
      <Card style={{ display: "inline-grid", padding: "20px" }}>
        <Typography variant="h2">Game lounge</Typography>
        <Typography variant="h5">Game code: {gameToken}</Typography>

        <Card style={{ margin: "20px", padding: "10px", textAlign: "center" }}>
          <Typography variant="h5" style={{ margin: "10px" }}>
            Players
          </Typography>
          <div>
            {players && players.length
              ? players.map((player) => {
                  return (
                    <div style={{ display: "inline-grid" }} key={playerId}>
                      <PersonOutlineIcon
                        style={{
                          color: `${player.color}`,
                          height: "80px",
                          width: "80px",
                        }}
                      />
                      <Typography variant="body2">{player.nickname}</Typography>
                      {player.playerId === playerId && (
                        <Typography variant="body1">You</Typography>
                      )}
                    </div>
                  );
                })
              : "No players"}
          </div>
        </Card>

        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              <Typography
                variant="h6"
                style={{ filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))" }}
              >
                Exit game room
              </Typography>
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("start game")}
          >
            <Typography
              variant="h6"
              style={{ filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))" }}
            >
              Start game
            </Typography>
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default GameLounge;
