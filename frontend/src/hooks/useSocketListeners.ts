import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { useSnackbar } from "notistack";

import {
  setOpenTrackCards,
  setPlayers,
  setCurrentPlayer,
  setRoutes,
  setTickets,
  setTrackCards,
} from "../redux/game";
import {
  GameRoutes,
  PlayerClient,
  PlayerColor,
  PlayerTrackCards,
  SocketResponse,
  Ticket,
  TrackColor,
} from "@typeDef/types";

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
      socket.on("currentPlayer", currentPlayerListener);
      socket.on(
        "pick_card_from_openTrackCards",
        pickFromOpenTrackCardsListener,
      );
      socket.on("pick_card_from_trackCards", pickFromTrackCardsListener);

      // TODO: Handle pick initial tickets error handling
    }

    return () => {
      socket.off("open_track_cards");
      socket.off("routes");
      socket.off("track_cards");
      socket.off("tickets");
      socket.off("players");
      socket.off("currentPlayer");
      socket.off("pick_card_from_openTrackCards");
      socket.off("pick_card_from_trackCards");
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

  const currentPlayerListener = (player: PlayerColor) => {
    if (player) {
      dispatch(setCurrentPlayer(player));
    }
  };

  const pickFromOpenTrackCardsListener = (
    data: SocketResponse<PlayerTrackCards>,
  ) => {
    if (data) {
      if (data.message !== "init") {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
    }
  };
  const pickFromTrackCardsListener = (
    data: SocketResponse<PlayerTrackCards>,
  ) => {
    if (data) {
      if (data.message !== "init") {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
    }
  };

  return isListening;
};

export default useSocketListeners;
