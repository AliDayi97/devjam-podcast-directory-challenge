import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PodcastApiContext } from "../contexts/PodcastApiProvider";
import { add as addPodcasts } from "../redux/podcastSlice";
import { normalize } from "../utils";

export default function Main() {
  const podcasts = useSelector((state) => state.podcasts.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { client } = useContext(PodcastApiContext);
  const [text, setText] = useState("");

  const search = () => {
    if (text && text.length > 0) {
      client
        .search({
          q: text,
          offset: 0,
          len_min: 10,
          len_max: 30,
          language: "English",
          safe_mode: 0,
        })
        .then((res) => {
          dispatch(addPodcasts(res.data));
        })
        .catch((err) => console.log("error: ", err));
    }
  };

  return (
    <main className="main">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search for a podcast..."
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button onClick={search} className="search-btn">
          Search
        </button>
      </div>

      {podcasts && podcasts.results && podcasts.results.length > 0 && (
        <div className="podcast-list">
          {podcasts.results.map((p, i) => {
            const {
              id,
              link,
              thumbnail,
              image,
              pub_date_ms,
              podcast,
              title_original: title,
              description_original: description,
            } = p;

            const { publisher_original: author, id: podcastId } = podcast;
            return (
              <div
                key={id}
                className="podcast-item"
                onClick={() => {
                  navigate(`/podcast/${podcastId}`);
                }}
              >
                <img src={image} alt={title} className="podcast-item-image" />

                <div className="details">
                  <h3>{title}</h3>
                  <p>{normalize(description)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
