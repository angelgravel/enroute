import React, { FC, useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  Card,
  Fade,
  Modal,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import cloneDeep from "lodash.clonedeep";

import { TrackColor } from "@typeDef/index";
import { unsetChosenRoute } from "redux/chosenRoute";
import { RootState } from "redux/store";
import { socket } from "context/socket";
import socketEmit from "utils/socketEmit";

type CardModalProps = {};
const TrackCardModal: FC<CardModalProps> = ({}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { trackCards } = useSelector((state: RootState) => state.game);
  const chosenRoute = useSelector((state: RootState) => state.chosenRoute);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChosenCardsEnough, setIsChosenCardsEnough] = useState<boolean>(
    false,
  );
  const [chosenTrackCards, setChosenTrackCards] = useState<{
    [idx: number]: TrackColor;
  }>({});
  const [availableTrackCards, setAvailableTrackCards] = useState<TrackColor[]>(
    [],
  );

  const toggleTrackCard = (trackColor: TrackColor, idx: number) => {
    let _chosenTrackCards = cloneDeep(chosenTrackCards);
    if (_chosenTrackCards.hasOwnProperty(idx)) {
      delete _chosenTrackCards[idx];
    } else {
      _chosenTrackCards[idx] = trackColor;
    }
    setChosenTrackCards(_chosenTrackCards);
  };

  const handleBuildRoute = () => {
    let _chosenTrackCards = Object.values(chosenTrackCards);
    const data = {
      chosenRoute: chosenRoute.id,
      chosenTrackCards: _chosenTrackCards,
    };

    if (socket) {
      socketEmit(socket, "build_route", data);
    }

    setIsModalOpen(false);
    setChosenTrackCards({});
  };

  useEffect(() => {
    dispatch(unsetChosenRoute());
  }, []);

  useEffect(() => {
    try {
      const _chosenTrackCards = Object.values(chosenTrackCards);

      if (_chosenTrackCards.length !== chosenRoute.length) {
        throw new Error();
      }

      if (chosenRoute.color === "any") {
        const noBridges = _chosenTrackCards.filter(
          (trackColor) => trackColor !== "bridge",
        );
        if (!noBridges.every((trackColor, i, arr) => arr[0] === trackColor)) {
          throw new Error();
        }
      }

      if (
        chosenRoute.bridges !== 0 &&
        _chosenTrackCards.filter((color) => color === "bridge").length !==
          chosenRoute.bridges
      ) {
        throw new Error();
      }

      setIsChosenCardsEnough(true);
    } catch (error) {
      setIsChosenCardsEnough(false);
    }
  }, [chosenTrackCards]);

  useEffect(() => {
    if (
      chosenRoute.color &&
      chosenRoute.length &&
      chosenRoute.bridges !== undefined
    ) {
      let _availableTrackCards: TrackColor[] = [];
      const bridgeAmount = trackCards["bridge"].amount;

      for (const trackCard of Object.values(trackCards)) {
        if (
          (trackCard.color === "bridge" && trackCard.amount > 0) ||
          (chosenRoute.color === trackCard.color &&
            trackCard.amount + bridgeAmount >= chosenRoute.length) ||
          (chosenRoute.color === "any" &&
            trackCard.amount + bridgeAmount >= chosenRoute.length)
        ) {
          _availableTrackCards.push(
            ...Array.from(Array(trackCard.amount)).map(() => trackCard.color),
          );
        }
      }
      setAvailableTrackCards(_availableTrackCards);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setChosenTrackCards({});
    }
  }, [chosenRoute]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={isModalOpen}
      onClose={() => dispatch(unsetChosenRoute())}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isModalOpen}>
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            border: "4px solid #f9b1cd",
            borderRadius: "4px",
            padding: "10px",
            maxWidth: "600px",
            maxHeight: "400px",
          }}
        >
          <Typography variant="h3" style={{ margin: "10px" }}>
            Choose the cards you want to play:
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              overflow: "scroll",
              paddingBottom: "10px",
            }}
          >
            {availableTrackCards.map((trackColor, i) => {
              return (
                <Card
                  key={`${trackCards[trackColor].color}:${i}`}
                  style={{
                    margin: "8px",
                    height: "80px",
                    width: "80px",
                    cursor: "pointer",
                  }}
                  raised={chosenTrackCards.hasOwnProperty(i)}
                  onClick={() => toggleTrackCard(trackColor, i)}
                >
                  {trackColor}
                </Card>
              );
            })}
          </div>
          <Button
            variant="contained"
            color="secondary"
            style={{ alignSelf: "center" }}
            onClick={handleBuildRoute}
            disabled={!isChosenCardsEnough}
          >
            <Typography
              variant="h6"
              style={{
                filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))",
              }}
            >
              Build route ({Object.keys(chosenTrackCards).length})
            </Typography>
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};
export default TrackCardModal;
