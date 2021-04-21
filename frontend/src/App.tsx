import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import StoreWithProvider from "./redux/store";
import { setTest } from "./redux/test/index";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import styled from "styled-components";

import Home from "./routes/Home";
import GameLounge from "./routes/GameLounge";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffb347',
    },
    secondary: {
      main: '#DB93A5',
    },
    error: {
      main: '#ff0000',
    },
  },
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
            <Route path="/gamelounge">
              <GameLounge />
            </Route>
            <Route path="/">
              <Home />
            </Route>
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
