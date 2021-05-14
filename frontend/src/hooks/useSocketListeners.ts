import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setPlayers, setTickets, setTrackCards } from "../redux/game";
import { PlayerClient, PlayerTrackCards, Ticket } from "@typeDef/types";
import { Socket } from "socket.io-client";

const useSocketListeners = (socket: Socket) => {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      setIsListening(true);

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
