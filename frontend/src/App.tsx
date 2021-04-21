import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import StoreWithProvider from "./redux/store";
import { setTest } from "./redux/test/index";

type Approps = {
  test?: string;
};
const App: FC<Approps> = ({ test }) => {
  return (
    <StoreWithProvider>
      <Test />
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
