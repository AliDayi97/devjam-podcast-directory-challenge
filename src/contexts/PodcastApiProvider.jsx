import { Client } from "podcast-api";
import React, { createContext, useEffect, useState } from "react";
import { getGenres } from "../utils";

const client = Client({ apiKey: process.env.REACT_APP_PODCAST_API_KEY });

export const PodcastApiContext = createContext({});

export default function PodcastApiProvider({ children }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres(getGenres());
  }, []);

  const getPodcast = async (id) => {
    try {
      const result = await client.fetchPodcastById({
        id,
        sort: "recent_first",
      });

      return result.data;
    } catch (error) {
      console.log(`Error while fetching podcast ${id}`, error);
      return { error: "Error while fetching podcast" };
    }
  };

  const values = { client, genres, getPodcast };
  return (
    <PodcastApiContext.Provider value={values}>
      {children}
    </PodcastApiContext.Provider>
  );
}
