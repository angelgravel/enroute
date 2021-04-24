import { FC, useState } from "react";
import { Button, Card, Typography, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    width: 100vw;
`;

const GameLounge: FC = () => {
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    let gameToken: string = "game7438qgrfb"; //TODO: get gameToekn from Redux. (this is only temporary)
    let participants: number = 1; //TODO: get amount of plyers from Redux. (this is only temporary)

    const handleStartGame = () => {
        if(participants < 3) setAlertOpen(true);
    }

    const handleSnackbar = () => () => {
    };

    return(
        <Container>
            <Card style={{display: 'inline-grid', padding: "20px"}}>
                <Typography variant="h2">Game lounge</Typography>
                <Typography variant="h6">Game code: {gameToken}</Typography>
                
                <Card style={{margin: '20px', padding: '10px', textAlign: 'center'}}>
                    Participants: 
                    <div>
                        <Typography variant="h2">{participants}</Typography>
                    </div>
                </Card>

                <div>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="secondary">Exit game room</Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={() => console.log("start game")}>Start game</Button>
                </div>
            </Card>
        </Container>
    );
  };

export default GameLounge;
