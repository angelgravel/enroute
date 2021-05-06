import { FC, useEffect, useState } from "react";

import GameLounge from "./GameLounge";
import { socketContext, socket } from "../../context/socket";
import useSocketListeners from "../../hooks/useSocketListeners";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

type GameRouteProps = {};
const GameRoute: FC<GameRouteProps> = ({}) => {
  const isListening = useSocketListeners(socket);
  const { tickets } = useSelector((state: RootState) => state.game);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    // When the server has sent tickets to the client, the game has started
    if (tickets && tickets.length) {
      setGameStarted(true);
    }
  }, [tickets]);

  if (isListening) {
    return (
      <socketContext.Provider value={socket}>
        {gameStarted ? <div>GAME</div> : <GameLounge />}
      </socketContext.Provider>
    );
  }

  return null;
};

export default GameRoute;
