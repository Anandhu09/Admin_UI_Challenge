import React from "react";
import "./Header.css";
function Header(props) {
  return (
    <nav className="nav">
      <p>{props.content}</p>
    </nav>
  );
}

export default Header;
