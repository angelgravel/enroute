import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Typography, Modal, Backdrop, Fade, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../assets/location.gif";
import { socketContext } from "../App";

/*=============== Types ===============*/
import { GameCreatedSocketResponse, PlayerJoinedSocketResponse, SocketEvent } from "@typeDef/index";
/*=====================================*/

const Container = styled.div`
    text-align: center;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
`;

const Home: FC = () => {
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [gameToken, setGameToken] = useState<string>("");
    const [error, setError] = useState<string>("");
    const socket = useContext(socketContext)


    useEffect(() => {
        if(socket){
        
        // socket.emit("create_game");
        socket.on("game_created", (data: GameCreatedSocketResponse) => {
            console.log(data);
            setGameToken(data.message);
        });

            
        socket.on("player_joined", (data: PlayerJoinedSocketResponse) => {
            console.log(data);
            if (data.joined) {
                history.push("/gamelounge");    //TODO Update Redux state
            } else {
                switch (data.message) {
                    case "create_game/not_created":
                        setError("Could not create game");
                        break;
                
                    default:
                        break;
                }
            }
        });

        }
    }, []);

    const socketEmit = (event: SocketEvent, message?: string ) => {
        socket?.emit(event, message);
    }


    //TODO: Add functionality to join a game (check if game code exits and if there is enough room)
    const handleJoinGame = () => {
        socketEmit("join_game", gameToken);
        console.log("enter game with code: ", gameToken);
    }

    return (
        <Container>
            <img src={logo} />
            <Typography variant="h2">EN ROUTE</Typography>
            <Link to='/gamelounge' style={{ textDecoration: 'none' }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => socketEmit("create_game")} //TODO: Add functionality to create a game
                >
                    <Typography variant="h6" style={{ filter: "drop-shadow(0 0 5px rgba(50, 50, 50, 0.2))" }}>Create game</Typography>
                </Button>
            </Link>
            <Button
                variant='contained'
                color='secondary'
                onClick={() => setIsModalOpen(true)}
            >
                <Typography variant="h6">Join game</Typography>
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={isModalOpen}>
                    <div
                        style={{
                            backgroundColor: "white",
                            border: '4px solid #f9b1cd',
                            borderRadius: '4px',
                            padding: '10px',
                        }}
                    >
                        <Typography variant="h3" style={{ margin: '10px' }} >Enter game code:</Typography>

                        <FormControl variant="outlined">
                            <InputLabel htmlFor="game_code" >Game code</InputLabel>
                            <OutlinedInput
                                id="game_code"
                                type={'text'}
                                // value={gameToken}
                                onChange={(e) => setGameToken(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleJoinGame}
                                            edge="end"
                                        >
                                            <ArrowForwardIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>

                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default Home;
