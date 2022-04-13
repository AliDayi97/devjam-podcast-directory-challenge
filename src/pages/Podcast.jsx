import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGenreNames, msToDate } from "../utils";

export default function Podcast({ getPodcast }) {
  const params = useParams();
  const podcastId = params.podcastId;
  const [error, setError] = useState();
  const [podcastDetails, setPodcastDetails] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (podcastId && !podcastDetails) {
      const getPodcastData = async () => {
        const data = await getPodcast(podcastId);
        if (data.error) {
          setError(data.error);
        }
        console.log("podcast detsails", data);
        setPodcastDetails(data);
      };

      getPodcastData();
    }
  }, [podcastId]);

  const genres = getGenreNames(podcastDetails?.genre_ids);

  return (
    <div className="podcast-page">
      {podcastDetails ? (
        <>
          <Link to="/">Home</Link>
          <div className="header">
            <div className="title">
              <h2>{podcastDetails.title}</h2>
              <p>By {podcastDetails.publisher}</p>
              <p>
                First released on{" "}
                {msToDate(podcastDetails.earliest_pub_date_ms)}
              </p>

              <div className="genres">
                {genres.map((genre, index) => (
                  <div key={genre}>{genre}</div>
                ))}
              </div>
            </div>
            <img src={podcastDetails.image} alt="podcast-img" />
          </div>

          <p className="description">{podcastDetails.description}</p>

          <a href={podcastDetails.website} target="_blank" rel="noreferrer">
            Visit Website
          </a>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
