import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useFetch = (key, url) => {
  const { data, status } = useQuery(key, async () => {
    return axios.get(url).then((res) => res.data);
  });

  return { data, status };
};

export default useFetch;
