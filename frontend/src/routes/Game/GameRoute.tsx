import { FC, useState } from "react";

import GameLounge from "./GameLounge";
import { socketContext, socket } from "../../context/socket";
import useSocketListeners from "../../hooks/useSocketListeners";

type GameRouteProps = {};
const GameRoute: FC<GameRouteProps> = ({}) => {
  useSocketListeners();
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <socketContext.Provider value={socket}>
      {gameStarted ? <div>GAME</div> : <GameLounge />}
    </socketContext.Provider>
  );
};

export default GameRoute;
