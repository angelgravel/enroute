import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import StoreWithProvider from "./redux/store";
import { setTest } from "./redux/test/index";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import styled from "styled-components";

const ENDPOINT = "http://localhost:3001";

import Home from "./routes/Home";
import GameLounge from "./routes/GameLounge";

const theme = createMuiTheme({
  shape: { 
    borderRadius: 3,
  },
  palette: {
    primary: {
      main: '#fde77d',
    },
    secondary: {
      main: '#f9b1cd',
    },
    error: {
      main: '#ff0000',
    },
  },
  overrides: { 
    MuiButton: {
      contained: {
        boxShadow: 'none',
        border: "4px solid",
        margin: '10px',
        color: 'white',
        '& > .MuiButton-label': {
          color: 'white', 
        },
      },
      containedPrimary: {
        borderColor: "#dfc95f",
      },
      containedSecondary: {
        borderColor: "#db93a5",
      }
    },
    MuiTypography: {
      h1: { 
        fontFamily: 'Amatic SC',
        color: "rgb(88, 88, 88)"
      },
      h2: { 
        fontFamily: 'Amatic SC',
        color: "rgb(88, 88, 88)"
      },
      h3: { 
        fontFamily: 'Amatic SC',
        color: "rgb(88, 88, 88)"
      }
    }
  }
});

const Container = styled.div`
    position:fixed;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
`;

const ENDPOINT = "http://localhost:3001";

const App: FC = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("test", (data: string) => {
      setResponse(data);
    });
  }, []);

  return (
    <StoreWithProvider>
      {/* <p>{response}</p> */}
      <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <Switch>
          <Route path={`/`} exact render={() => <Home />} />
          <Route path={`/gamelounge`} exact render={() => <GameLounge />} />
          </Switch>
        </Container>
        </ThemeProvider>
      </Router>
    </StoreWithProvider>
  );
};

const Test: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setTest({
        testName: "Jacques",
        testAge: 1000,
      }),
    );
  }, []);
  return null;
};

export default App;
