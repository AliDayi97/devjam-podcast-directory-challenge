import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PodcastApiContext } from "./contexts/PodcastApiProvider";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import "./style.css";

function App() {
  const { getPodcast } = useContext(PodcastApiContext);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="/podcast/:podcastId"
        element={<Podcast getPodcast={getPodcast} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
