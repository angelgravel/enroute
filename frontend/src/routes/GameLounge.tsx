import { FC, useEffect, useState } from "react";
import { Button, Card, Typography, Snackbar, Divider } from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/location.gif";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    width: 100vw;
`;

type Player = {
    nickname: string;
    playerId: string;
    color: string
};

const GameLounge: FC = () => {
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    let gameToken: string = "game7438qgrfb"; //TODO: get gameToekn from Redux. (this is only temporary)
    const [players, setPlayers] = useState<any>([{nickname: "Emma", playerId: "hfajkh", color: "green"}, {nickname: "Emma", playerId: "hfajkh", color: "blue"}]); //TODO: get }amount of plyers from Redux. (this is only temporary)

    const handleStartGame = () => {
    }

    const handleSnackbar = () => () => {

    };

    const generatePlayers = () => {
        players.map((player: Player) => {
            return (<div style={{display: 'inline-grid'}}>
                <PersonOutlineIcon style={{color: `${player.color}`, height: "80px", width: "80px"}} />
                <Typography variant='body1'>{player.nickname}</Typography>
            </div>)
        })
    }

    return(
        <Container>
            <Card style={{display: 'inline-grid', padding: "20px"}}>
                <Typography variant="h2">Game lounge</Typography>
                <Typography variant="h5">Game code: {gameToken}</Typography>
                
                <Card style={{margin: '20px', padding: '10px', textAlign: 'center'}}>
                    <Typography variant="h5" style={{margin: '10px'}}>Players</Typography> 
                    <div>
                        {generatePlayers}
                    </div>
                </Card>

                <div>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="secondary">
                            <Typography variant="h6" style={{filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))"}}>Exit game room</Typography> 
                        </Button>
                    </Link>
                    <Button 
                        variant="contained"  
                        color="primary" 
                        onClick={() => console.log("start game")}
                    >
                        <Typography variant="h6" style={{filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))"}}>Start game</Typography> 
                    </Button>
                </div>
            </Card>
        </Container>
    );
  };

export default GameLounge;
