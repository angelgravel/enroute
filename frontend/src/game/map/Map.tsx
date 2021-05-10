import React, { FC } from "react";
import { motion } from "framer-motion";

import Background from "./Background";
import Cities from "./Cities";
import Routes from "./Routes";

const Map: FC = ({}) => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      id="game_map"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1921 1049"
    >
      <Background />
      <Cities />
      <Routes />
    </motion.svg>
  );
};

export default Map;
