import React, { FC } from "react";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";

import logo from "../assets/wheel.gif";

const Container = styled.div`
    text-align: center;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Home: FC = () => {

    return(
        <Container>
            <img src={logo} />
            <Typography variant="h4" style={{color: '#585858'}} >EN ROUTE</Typography> 
            <Button 
                style={{boxShadow: 'none', margin: '10px'}} 
                variant='contained' 
                color='primary'
                onClick={() => console.log("Lets create a new game")} //TODO: Add functionality to join a game
            >
                <Typography variant="h6" style={{color: 'white'}}>Create game</Typography> 
            </Button>
            <Button 
                style={{boxShadow: 'none', margin: '10px'}} 
                variant='contained' 
                color='secondary'
                onClick={() => console.log("Lets create join a game")} //TODO: Add functionality to join a game
            >
                <Typography variant="h6" style={{color: 'white'}}>Join game</Typography> 
            </Button>
        </Container>
    );
  };

export default Home;
