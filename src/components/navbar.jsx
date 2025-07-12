import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "#eee", padding: "10px" }}>
      <Link to="/">Home</Link> | <Link to="/ask">Ask Question</Link> | <Link to="/login">Login</Link>
    </nav>
  );
}