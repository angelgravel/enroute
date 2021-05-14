import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import {
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
} from "@material-ui/core";
import styled from "styled-components";

import { firstCap } from "utils/firstCap";

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// const TicketsCardWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   margin: 1vw;
//   height: 25vh;
//   width: 20vw;
//   min-width: 70px;
//   max-width: 175px;
//   text-align: center;
// `;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 4px solid #f9b1cd;
  border-radius: 4px;
  padding: 10px;
`;

const useStyles = makeStyles({
  ticketsCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "1vw",
    height: "25vh",
    width: "20vw",
    minWidth: "70px",
    maxWidth: "175px",
    textAlign: "center",
  },
});

type TicketsModalProp = {
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const TicketsModal: FC<TicketsModalProp> = ({
  modalState: [isModalOpen, setIsModalOpen],
}) => {
  const { tickets } = useSelector((state: RootState) => state.game);
  const classes = useStyles();

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
        <ContentWrapper>
          <Typography
            variant="h3"
            style={{ margin: "10px", textAlign: "center" }}
          >
            Destination Tickets
          </Typography>

          <CardsWrapper>
            {tickets && tickets.length
              ? tickets.map((ticket) => {
                  return (
                    <div key={`${ticket.start}_${ticket.end}`}>
                      <Card
                        key={`${ticket.start}_${ticket.end}`}
                        className={classes.ticketsCard}
                      >
                        {/* TODO: Make cleaner code. Other way to make new line? */}
                        <div>
                          <CardHeader
                            title={`${firstCap(ticket.start)}`}
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
                            title={`${firstCap(ticket.end)}`}
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
            onClick={() => setIsModalOpen(false)}
          >
            <Typography
              variant="h6"
              style={{
                filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))",
              }}
            >
              Close
            </Typography>
          </Button>
        </ContentWrapper>
      </Fade>
    </Modal>
  );
};

export default TicketsModal;
