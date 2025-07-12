import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>📚 All Questions</h2>

      {questions.length === 0 ? (
        <p>No questions posted yet.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q._id}
            style={{
              marginBottom: "25px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 0 5px rgba(0,0,0,0.05)",
            }}
          >
            <Link
              to={`/question/${q._id}`}
              style={{ textDecoration: "none", color: "#007bff", fontSize: "18px" }}
            >
              {q.title}
            </Link>
            <p style={{ marginTop: "10px", color: "#555" }}>
              {q.description.replace(/<[^>]+>/g, "").slice(0, 150)}...
            </p>
            <div style={{ marginTop: "10px" }}>
              {q.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    marginRight: "8px",
                    background: "#e0f0ff",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllQuestions;
