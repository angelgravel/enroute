import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { useSnackbar } from "notistack";

import {
  setOpenTrackCards,
  setPlayers,
  setRoutes,
  setTickets,
  setTrackCards,
} from "../redux/game";
import {
  GameRoutes,
  PlayerClient,
  PlayerTrackCards,
  SocketResponse,
  Ticket,
  TrackColor,
} from "@typeDef/index";

const useSocketListeners = (socket: Socket) => {
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

      // TODO: Handle pick initial tickets error handling
    }

    return () => {
      socket.off("open_track_cards");
      socket.off("routes");
      socket.off("track_cards");
      socket.off("tickets");
      socket.off("players");
    };
  }, [socket]);

  const openTrackCardsListener = (openTrackCards: TrackColor[]) => {
    if (openTrackCards) {
      dispatch(setOpenTrackCards(openTrackCards));
    }
  };

  const routesListener = (data: SocketResponse<GameRoutes>) => {
    if (data) {
      enqueueSnackbar(data.message, {
        variant: data.success ? "success" : "error",
      });
      dispatch(setRoutes(data.payload));
    }
  };

  const trackCardsListener = (data: SocketResponse<PlayerTrackCards>) => {
    if (data) {
      enqueueSnackbar(data.message, {
        variant: data.success ? "success" : "error",
      });
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

  return isListening;
};

export default useSocketListeners;
