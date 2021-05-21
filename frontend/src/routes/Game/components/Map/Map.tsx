import { FC } from "react";
import { motion } from "framer-motion";

import Background from "./Background";
import Cities from "./Cities";
import Routes from "./Routes";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #94d9db;
`;

const Map: FC = () => {
  return (
    <MapWrapper>
      <motion.svg
        width="100%"
        height="100%"
        id="game_map"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1921 1049"
        initial={{ opacity: 1, clipPath: "circle(1px at 50% 50%)" }}
        animate={{
          opacity: 1,
          clipPath: "circle(70% at 50% 50%)",
          transition: {
            duration: 1,
          },
        }}
      >
        <Background />
        <Cities />
        <Routes />
      </motion.svg>
    </MapWrapper>
  );
};

export default Map;
