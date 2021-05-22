import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import {
  setOpenTrackCards,
  setPlayers,
  setRoutes,
  setTickets,
  setTrackCards,
  unsetGame,
} from "../redux/game";
import {
  GameRoutes,
  PlayerClient,
  PlayerTrackCards,
  SocketResponse,
  Ticket,
  TrackColor,
} from "@typeDef/types";

const useSocketListeners = (socket: Socket) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      setIsListening(true);

      socket.on("open_track_cards", openTrackCardsListener);
      socket.on("routes", routesListener);
      socket.on("track_cards", trackCardsListener);
      socket.on("tickets", ticketsListener);
      socket.on("players", playersListener);
      socket.on("disconnect", disconnectListener);

      // TODO: Handle pick initial tickets error handling
    }

    return () => {
      socket.off("open_track_cards");
      socket.off("routes");
      socket.off("track_cards");
      socket.off("tickets");
      socket.off("players");
      socket.off("disconnect");
    };
  }, [socket]);

  const openTrackCardsListener = (openTrackCards: TrackColor[]) => {
    if (openTrackCards) {
      dispatch(setOpenTrackCards(openTrackCards));
    }
  };

  const routesListener = (data: SocketResponse<GameRoutes>) => {
    if (data) {
      if (data.message !== "init") {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
      dispatch(setRoutes(data.payload));
    }
  };

  const trackCardsListener = (data: SocketResponse<PlayerTrackCards>) => {
    if (data) {
      if (data.message !== "init") {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
      dispatch(setTrackCards(data.payload));
    }
  };

  const ticketsListener = (tickets: Ticket[]) => {
    if (tickets) {
      dispatch(setTickets(tickets));
    }
  };

  const playersListener = (players: PlayerClient[]) => {
    if (players) {
      dispatch(setPlayers(players));
    }
  };

  const disconnectListener = () => {
    // TODO: Maybe some other way later on?
    dispatch(unsetGame());
    enqueueSnackbar("Disconnected from game", {
      variant: "error",
      autoHideDuration: 3000,
    });
    history.push("/");
  };

  return isListening;
};

export default useSocketListeners;
