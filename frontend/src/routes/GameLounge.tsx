import { FC } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const GameLounge: FC = () => {

    return(
        <Container>
            GameLounge component
            <Link to="/" style={{textDecoration: 'none'}}>
                <Button variant="contained" color="secondary">Exit game room</Button>
            </Link>
            <Button variant="contained" color="primary" onClick={() => console.log("start game")}>Start game</Button>
        </Container>
    );
  };

export default GameLounge;
