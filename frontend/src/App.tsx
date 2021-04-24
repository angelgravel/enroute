import { FC, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import StoreWithProvider from "./redux/store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import './index.css';
import Home from "./routes/Home";
import GameLounge from "./routes/GameLounge";

const ENDPOINT = "http://localhost:3001";

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
      },
      h5: { 
        fontWeight: 'normal',
        fontSize: '1rem',
        color: "rgb(88, 88, 88)"
      },
      h6: { 
        fontWeight: 'normal',
        fontSize: '1rem',
        color: 'white'
      },
      body1: {
        color: "rgb(88, 88, 88)",
        fontSize: "0.8rem",
      }
    }
  }
});

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
          <Switch>
          <Route path={`/`} exact render={() => <Home />} />
          <Route path={`/gamelounge`} exact render={() => <GameLounge />} />
          </Switch>
        </ThemeProvider>
      </Router>
    </StoreWithProvider>
  );
};

export default App;
