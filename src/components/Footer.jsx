import React from "react";
import listenNotesImg from "./../assets/powered-by-listen-notes.png";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2022</p>
      <img
        src={listenNotesImg}
        alt="powered by listen notes"
        className="listen-notes-img"
      />
    </footer>
  );
}
