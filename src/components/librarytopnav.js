import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "../pages/dashboard.css";
import NameAccount from "./nameaccount";

const LibraryTopNav = () => {
  const navigate = useNavigate();
  const messages = ["Where words fail, music speaks", "Music is the art of thinking with sounds", "Music in the soul can be heard by the universe"];
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullMessage = messages[messageIndex];
      if (isDeleting) {
        setCurrentMessage((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(75);
      } else {
        setCurrentMessage((prev) =>
          currentFullMessage.substring(0, charIndex + 1)
        );
        setTypingSpeed(150);
      }

      if (!isDeleting && charIndex === currentFullMessage.length) {
        setTimeout(() => setIsDeleting(true), 2000); 
      } else if (isDeleting && currentMessage === "") {
        setIsDeleting(false);
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setCharIndex(0);
      } else if (!isDeleting) {
        setCharIndex((prevIndex) => prevIndex + 1);
      } else {
        setCharIndex((prevIndex) => prevIndex - 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [
    charIndex,
    isDeleting,
    messages,
    messageIndex,
    typingSpeed,
    currentMessage,
  ]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setUsername(userInfo.name); // Adjust this based on your actual user info structure
    }
  }, []);

  const handleAccountClick = () => {
    navigate("/account");
  };

  return (
    <div className="top-heading-container">
      <h3 className="spinning-text">{currentMessage}</h3>
      <NameAccount username={username}/>
    </div>
  );
};

export default LibraryTopNav;
