import { FC, useEffect, useState } from "react";
import { useBeforeUnload } from "react-use";

import { useAppSelector } from "@redux/store";
import { socket, socketContext } from "@gameHooks/useSocket";
import useSocketListeners from "@hooks/useSocketListeners";

import Loader from "@components/Loader";
import GameLounge from "./GameLounge";
import Game from "./Game";

type GameRouteProps = {};
const GameRoute: FC<GameRouteProps> = ({}) => {
  const isListening = useSocketListeners(socket);
  const { tickets } = useAppSelector((state) => state.game);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  // useBeforeUnload(gameStarted, "You will not be able to rejoin the game, are you sure?");

  useEffect(() => {
    // When the server has sent tickets to the client, the game has started
    if (tickets && tickets.length) {
      setGameStarted(true);
    }
  }, [tickets]);

  if (!isListening) {
    return <Loader fullscreen />;
  }

  return <socketContext.Provider value={socket}>{gameStarted ? <Game /> : <GameLounge />}</socketContext.Provider>;
};

export default GameRoute;
