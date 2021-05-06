import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { socketContext } from "../context/socket";

const useSocketListeners = () => {
  const socket = useContext(socketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on("track_cards", () => {
        // TODO: Update redux
      });

      socket.on("tickets", () => {
        // TODO: Update redux
      });

      socket.on("players", () => {
        // TODO: Update redux
      });
    }
  }, [socket]);
};

export default useSocketListeners;
