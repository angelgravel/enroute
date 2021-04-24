import React, { FC, useState } from "react";
import { Button, Typography, Modal, Backdrop, Fade, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../assets/location.gif";

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
    const [gameCode, setGameCode] = useState<string>("");

    //TODO: Add functionality to join a game (check if game code exits and if there is enough room)
    const handleGameCode = () => {
        console.log("enter game with code: ", gameCode);
        if(gameCode === "hej") history.push("/gamelounge") //If gamecode is "hej then it will route to gamelounge"
    } 

    return(
        <Container>
            <img src={logo} />
            <Typography variant="h2">EN ROUTE</Typography> 
            <Link to='/gamelounge' style={{textDecoration: 'none'}}>
                <Button 
                    variant='contained' 
                    color='primary'
                    onClick={() => console.log("Lets create a new game")} //TODO: Add functionality to create a game
                    >
                    <Typography variant="h6" style={{filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))"}}>Create game</Typography> 
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
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500}}
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
                    <Typography variant="h3" style={{margin: '10px'}} >Enter game code:</Typography>

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="game_code" >Game code</InputLabel>
                        <OutlinedInput
                            id="game_code"
                            type={'text'}
                            // value={gameCode}
                            onChange={(e) => setGameCode(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleGameCode}
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
