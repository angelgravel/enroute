import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";

import StoreWithProvider from "./redux/store";
import { setTest } from "./redux/test/index";

const ENDPOINT = "http://192.168.1.73:3001";

type Approps = {
  test?: string;
};
const App: FC<Approps> = ({ test }) => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("test", (data: string) => {
      setResponse(data);
    });
  }, []);

  return (
    <StoreWithProvider>
      <p>{response}</p>
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
