import { FC, useEffect, useMemo, useState } from "react";
import { Button, Card, FormControl, IconButton, Input, InputAdornment, Tooltip, Typography } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ShareIcon from "@material-ui/icons/Share";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import copy from "clipboard-copy";

import { useAppDispatch, useAppSelector } from "@redux/store";
import useSocket from "@gameHooks/useSocket";
import socketEmit from "@utils/socketEmit";
import { unsetGame } from "@redux/game";
import { playerColorToHex } from "@utils/constants";
import type { SocketResponse, AddSocketPayload, AddSocketEmit } from "@typeDef/types";

import Pin from "@assets/Pin";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
`;

const GameIdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

type GameLoungeProps = {};
const GameLounge: FC<GameLoungeProps> = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { players, gameToken, playerId } = useAppSelector((state) => state.game);

  const [copyTooltip, setCopyTooltip] = useState<string>("");
  const isCreator = useMemo<boolean>(() => {
    if (players.find((player) => player.creator && player.playerId === playerId)) {
      return true;
    } else {
      return false;
    }
  }, [players]);

  useEffect(() => {
    if (socket) {
      socket.on("add_socket", (response: SocketResponse<AddSocketPayload>) => {
        console.log(response);
        if (!response.success) {
          // dispatch(unsetGame());
          console.log(response.payload);
          return;
        }
      });

      // Setup game
      socket.on("setup_game", (data: SocketResponse<undefined>) => {
        if (!data.success) {
          enqueueSnackbar(data.message, {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      });
    }

    return () => {
      socket.off("add_socket");
      socket.off("setup_game");
    };
  }, [socket]);

  useEffect(() => {
    if (socket && playerId && gameToken) {
      const addSocketEmit: AddSocketEmit = {
        gameToken,
        playerId,
      };
      socketEmit(socket, "add_socket", addSocketEmit);
    }
  }, [socket, playerId, gameToken]);

  useEffect(() => {
    if (!gameToken) {
      history.push("/");
    }
  }, [gameToken]);

  const handleStartGame = () => {
    socketEmit(socket, "setup_game");
  };

  // TODO: Check if game exists

  return (
    <Container>
      <Pin animate style={{ width: "7rem" }} />
      <Card
        style={{
          display: "inline-grid",
          padding: "4rem",
          borderRadius: "0.5rem",
          filter: "drop-shadow(0 0 5px rgba(50, 50, 50, 0.3))",
        }}
      >
        <Typography variant="h2">Game lounge</Typography>

        <Typography variant="h5" style={{ marginRight: "0.5rem" }}>
          Game code: {gameToken.split("#")[1]}
        </Typography>

        <Tooltip
          open={copyTooltip !== ""}
          title={copyTooltip}
          leaveDelay={1500}
          onClose={() => {
            setCopyTooltip("");
          }}
        >
          <GameIdContainer>
            <Typography variant="h5" style={{ marginRight: "0.5rem" }}>
              Invite link:
            </Typography>
            <FormControl variant="standard">
              <Input
                readOnly
                defaultValue={`${window.location.href}/${gameToken.split("#")[1]}`}
                style={{ minWidth: 300, color: "rgb(88, 88, 88)" }}
                onFocus={(e) => e.target.select()}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Copy invite link to clipboard"
                      onClick={async () => {
                        try {
                          await copy(`${window.location.href}/${gameToken.split("#")[1]}`);
                          setCopyTooltip("Copied the invite link to your clipboard!");
                        } catch (error) {
                          setCopyTooltip("Could not copy the invite link to your clipboard...");
                        }
                      }}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <ShareIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </GameIdContainer>
        </Tooltip>

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
                          color: `${playerColorToHex[player.color]}`,
                          height: "80px",
                          width: "80px",
                        }}
                      />
                      <Typography variant="body2">{player.nickname}</Typography>
                      {player.playerId === playerId && <Typography variant="body1">You</Typography>}
                    </div>
                  );
                })
              : "No players"}
          </div>
        </Card>

        <div>
          <Link
            to="/"
            onClick={() => {
              dispatch(unsetGame());
            }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="secondary">
              <Typography variant="h6" style={{ filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))" }}>
                Exit game room
              </Typography>
            </Button>
          </Link>
          {isCreator && (
            <Button variant="contained" color="primary" onClick={handleStartGame}>
              <Typography variant="h6" style={{ filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))" }}>
                Start Game
              </Typography>
            </Button>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default GameLounge;
