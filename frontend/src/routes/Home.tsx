import React, { FC } from "react";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";

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

    return(
        <Container>
            <img src={logo} />
            <Typography variant="h2" style={{color: '#585858'}} >EN ROUTE</Typography> 
            <Button 
                variant='contained' 
                color='primary'
                onClick={() => console.log("Lets create a new game")} //TODO: Add functionality to join a game
            >
                <Typography variant="h6" style={{filter: "drop-shadow(0 0 5px rgba(50, 50, 50, 0.2))"}}>Create game</Typography> 
            </Button>
            <Button 
                variant='contained' 
                color='secondary'
                onClick={() => console.log("Lets create join a game")} //TODO: Add functionality to join a game
            >
                <Typography variant="h6">Join game</Typography> 
            </Button>
        </Container>
    );
  };

export default Home;
