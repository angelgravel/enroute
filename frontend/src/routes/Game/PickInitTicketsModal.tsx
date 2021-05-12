import {
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { SocketEvent, Ticket } from "../../../../types/index";
import { socketContext } from "context/socket";
import { FC, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import { cityFirstCap } from "utils/cityFirstCap";

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PickInitTicketsModal: FC = () => {
  const socket = useContext(socketContext);
  const { tickets } = useSelector((state: RootState) => state.game);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isEnoughCards, setIsEnoughCards] = useState<boolean>(false);
  const [chosenTickets, setChosenTickets] = useState<Ticket[]>([]);

  const socketEmit = (event: SocketEvent, message?: any) => {
    socket?.emit(event, message);
  };

  useEffect(() => {
    if (chosenTickets.length >= 2) {
      setIsEnoughCards(true);
    } else {
      setIsEnoughCards(false);
    }
  }, [chosenTickets]);

  const isChosen = (ticket: Ticket) => {
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
      socketEmit("pick_initial_tickets", chosenTickets);
      setIsModalOpen(false);
    } else {
      // TODO: Change to enqueueSnackbar?
      console.log("You must choose at least 2 cards to keep!");
    }
  };

  return (
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

          <CardsWrapper>
            {tickets && tickets.length
              ? tickets.map((ticket) => {
                  return (
                    <div>
                      <Card
                        key={`${ticket.start}_${ticket.end}`}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          margin: "1vw",
                          height: "25vh",
                          width: "20vw",
                          minWidth: "70px",
                          maxWidth: "175px",
                          textAlign: "center",
                        }}
                        raised={isChosen(ticket)}
                        onClick={() => markTicket(ticket)}
                      >
                        <div>
                          <CardHeader
                            title={`${cityFirstCap(ticket.start)}`}
                            titleTypographyProps={{
                              align: "center",
                            }}
                            style={{
                              paddingBottom: "0.1vh",
                            }}
                          />
                          <CardHeader
                            title="-"
                            titleTypographyProps={{
                              align: "center",
                            }}
                            style={{
                              paddingBottom: "0.1vh",
                              paddingTop: "0.1vh",
                            }}
                          />
                          <CardHeader
                            title={`${cityFirstCap(ticket.end)}`}
                            titleTypographyProps={{
                              align: "center",
                            }}
                            style={{
                              paddingTop: "0.1vh",
                            }}
                          />
                        </div>
                        <CardContent>
                          <Typography align="center">
                            {ticket.points} points
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })
              : "No tickets"}
          </CardsWrapper>
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
  );
};

export default PickInitTicketsModal;
