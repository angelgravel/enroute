import React, { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInitGame } from "../redux/game";

import logo from "../assets/location.gif";
import { socketContext } from "../App";

/*=============== Types ===============*/
import {
  SocketResponse,
  SocketEvent,
  CreateJoinSocketPayload,
} from "@typeDef/index";
/*=====================================*/

const Container = styled.div`
  text-align: center;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

const Home: FC = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [gameToken, setGameToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const socket = useContext(socketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      // Game created
      socket.on(
        "create_game",
        (data: SocketResponse<CreateJoinSocketPayload>) => {
          console.log(
            data.payload.gameToken,
            "created by",
            data.payload.playerID,
          );
          if (data.success) {
            dispatch(
              setInitGame({
                gameToken: data.payload.gameToken,
                playerId: data.payload.playerID,
                color: data.payload.color,
              }),
            );
            history.push("/gamelounge");
          } else {
            switch (data.message) {
              case "create_game/not_created":
                setError("Could not create game");
                console.log(error);
                break;
              default:
                break;
            }
          }
        },
      );

      // Player joined
      socket.on(
        "join_game",
        (data: SocketResponse<CreateJoinSocketPayload>) => {
          console.log(
            data.payload.playerID,
            "joined:",
            data.success,
            data.payload.gameToken,
          );
          if (data.success) {
            history.push("/gamelounge");
            dispatch(
              setInitGame({
                gameToken: data.payload.gameToken,
                playerId: data.payload.playerID,
                color: data.payload.color, // Dummy color - CHANGE!
              }),
            );
          } else {
            switch (data.message) {
              case "join_game/not_joined":
                setError("Could not join game");
                console.log(error);
                break;
              default:
                break;
            }
          }
        },
      );
    }
  }, []);

  const socketEmit = (event: SocketEvent, message?: string) => {
    socket?.emit(event, message);
  };

  const handleCreateGame = () => {
    socketEmit("create_game");
  };

  //TODO: Add functionality to join a game (check if game code exits and if there is enough room)
  const handleJoinGame = () => {
    socketEmit("join_game", gameToken);
    console.log("enter game with code: ", gameToken);
  };

  return (
    <Container>
      <img src={logo} alt="logo" />
      <Typography variant="h2">EN ROUTE</Typography>
      <Link to="/gamelounge" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" onClick={handleCreateGame}>
          <Typography
            variant="h6"
            style={{ filter: "drop-shadow(0 0 5px rgba(50, 50, 50, 0.3))" }}
          >
            Create game
          </Typography>
        </Button>
      </Link>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setIsModalOpen(true)}
      >
        <Typography variant="h6">Join game</Typography>
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <div
            style={{
              backgroundColor: "white",
              border: "4px solid #f9b1cd",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            <Typography variant="h3" style={{ margin: "10px" }}>
              Enter game code:
            </Typography>

            <FormControl variant="outlined">
              <InputLabel htmlFor="game_code">Game code</InputLabel>
              <OutlinedInput
                id="game_code"
                type={"text"}
                // value={gameToken}
                onChange={(e) => setGameToken(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleJoinGame}
                      edge="end"
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Home;
