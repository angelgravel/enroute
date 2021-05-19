import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  setPlayers,
  setRoutes,
  setTickets,
  setTrackCards,
} from "../redux/game";
import {
  GameRoutes,
  PlayerClient,
  PlayerTrackCards,
  Ticket,
} from "@typeDef/index";
import { Socket } from "socket.io-client";

const useSocketListeners = (socket: Socket) => {
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
      socket.off("track_cards");
      socket.off("tickets");
      socket.off("players");
    };
  }, [socket]);

  const openTrackCardsListener = (openTrackCards: PlayerTrackCards) => {
    if (openTrackCards) {
      dispatch(setOpenTrackCards(openTrackCards));
    }
  };

  const routesListener = (routes: GameRoutes) => {
    if (routes) {
      dispatch(setRoutes(routes));
    }
  };

  const trackCardsListener = (trackCards: PlayerTrackCards) => {
    if (trackCards) {
      dispatch(setTrackCards(trackCards));
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
function setOpenTrackCards(trackCards: PlayerTrackCards): any {
  throw new Error("Function not implemented.");
}
