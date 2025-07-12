import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const questions = [
    { id: 1, title: "How to implement login in React?", tags: ["react", "auth"] },
    { id: 2, title: "What is useEffect hook?", tags: ["react", "hooks"] },
  ];

  return (
    <div>
      <h2>All Questions</h2>
      {questions.map((q) => (
        <div key={q.id}>
          <Link to={`/question/${q.id}`}><h3>{q.title}</h3></Link>
          <p>Tags: {q.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
