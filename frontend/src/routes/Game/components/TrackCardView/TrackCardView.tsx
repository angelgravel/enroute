import React, { FC, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import TrackCard from "../TrackCard";
import BackCard from "../BackCard";
import { TrackColor } from "@typeDef/types";
import socketEmit from "utils/socketEmit";
import { socketContext } from "context/socket";
import { useSnackbar } from "notistack";

const TrackCardView: FC = () => {
  const socket = useContext(socketContext);
  const { enqueueSnackbar } = useSnackbar();
  const { openTrackCards } = useSelector((state: RootState) => state.game);

  const handleOpenTrackCardsClick = (trackCard: TrackColor) => {
    if (trackCard && socket) {
      try {
        if (!openTrackCards.includes(trackCard)) {
          throw new Error("That card does not exists in OpenTrackCards!");
        }
        socketEmit(socket, "pick_card_from_openTrackCards", trackCard);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  };

  const handleTrackCardsClick = () => {
    if (socket) {
      socketEmit(socket, "pick_card_from_trackCards");
    }
  };

  return (
    <div style={{ backgroundColor: "#ededed" }}>
      {openTrackCards.map((trackCard, idx) => {
        return (
          <div
            key={`${trackCard}-${idx}`}
            style={{ padding: "10px" }}
            onClick={() => handleOpenTrackCardsClick(trackCard)}
          >
            <TrackCard
              key={`${trackCard}-${idx}`}
              color={trackCard}
              style={{ width: "6rem", cursor: "pointer" }}
              rotate
            />
          </div>
        );
      })}
      <div style={{ margin: "10px" }} onClick={() => handleTrackCardsClick()}>
        <BackCard style={{ width: "6rem", cursor: "pointer" }} rotate={true} />
      </div>
    </div>
  );
};

export default TrackCardView;
