import Axios from "axios";
import { useRef } from "react";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://api.enroute.vlq.se/api" : "http://localhost:3001/api";

const useAxios = () => {
  const axios = useRef(
    Axios.create({
      baseURL: BASE_URL,
    }),
  );
  return axios.current;
};

export default useAxios;
