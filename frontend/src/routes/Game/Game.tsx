import {
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
// import { ToggleButton } from "@material-ui/lab";
import { SocketEvent, Ticket } from "../../../../types/index";
import { socketContext } from "context/socket";
import { FC, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import { cityFirstCap } from "utils/cityFirstCap";

import Map from "../../game/map/Map";
import { CardHeader } from "@material-ui/core";

const GameWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  // align-items: center;
  // text-align: center;
  // height: 100vh;
  // width: 100vw;
`;

const Game: FC = () => {
  const socket = useContext(socketContext);
  const { tickets } = useSelector((state: RootState) => state.game);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isEnoughCards, setIsEnoughCards] = useState<boolean>(false);
  const [chosenTickets, setChosenTickets] = useState<Ticket[]>([]);

  console.log("tickets", tickets);

  const socketEmit = (event: SocketEvent, message?: any) => {
    console.log("socketEmit");
    socket?.emit(event, message);
  };

  useEffect(() => {
    if (chosenTickets.length >= 2) {
      setIsEnoughCards(true);
    } else {
      setIsEnoughCards(false);
    }
  }, [chosenTickets]);

  const isChosen = (ticket: Ticket): boolean => {
    if (chosenTickets.includes(ticket)) {
      return true;
    } else {
      return false;
    }
  };

  const markTicket = (ticket: Ticket) => {
    if (!chosenTickets.includes(ticket)) {
      const newTickets = [...chosenTickets, ticket];
      setChosenTickets(newTickets);
    } else {
      const filtered = chosenTickets.filter((t) => t !== ticket);
      setChosenTickets(filtered);
    }
  };

  const chooseTickets = () => {
    if (chosenTickets.length >= 2 && socket) {
      console.log("choose tickets");
      // socket.emit("pick_initial_tickets", chosenTickets);
      socketEmit("pick_initial_tickets", chosenTickets);
      setIsModalOpen(false);
    } else {
      // TODO: Change to enqueueSnackbar
      console.log("You must choose at least 2 cards to keep!");
    }
  };

  return (
    <GameWrapper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignContent: "center",
              backgroundColor: "white",
              border: "4px solid #f9b1cd",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h3"
              style={{ margin: "10px", textAlign: "center" }}
            >
              Choose at least two Destination Tickets to keep
            </Typography>

            <Container>
              {tickets && tickets.length
                ? tickets.map((ticket) => {
                    return (
                      <Card
                        key={`${ticket.start}_${ticket.end}`}
                        style={{
                          margin: "10px",
                          width: "20vw",
                          textAlign: "center",
                        }}
                        raised={isChosen(ticket)}
                        // How to set for THIS specific card?
                        onClick={() => markTicket(ticket)}
                      >
                        <CardHeader
                          title={`${cityFirstCap(ticket.start)} - 
                            ${cityFirstCap(ticket.end)}`}
                        ></CardHeader>
                        <CardContent>
                          <Typography>{ticket.points} points</Typography>
                        </CardContent>
                      </Card>
                    );
                  })
                : "No tickets"}
            </Container>
            <Button
              variant="contained"
              color="secondary"
              style={{ maxWidth: "200px", alignSelf: "center" }}
              onClick={chooseTickets}
              disabled={!isEnoughCards}
            >
              <Typography
                variant="h6"
                style={{
                  filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))",
                }}
              >
                Choose tickets
              </Typography>
            </Button>
          </div>
        </Fade>
      </Modal>
      ;
      <Map />
    </GameWrapper>
  );
};

export default Game;
