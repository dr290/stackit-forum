import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => console.error("Error fetching question:", err));

    fetch(`http://localhost:5000/api/answers/${id}`)
      .then((res) => res.json())
      .then((data) => setAnswers(data))
      .catch((err) => console.error("Error fetching answers:", err));
  }, [id]);

  const handlePostAnswer = async () => {
    const userId = localStorage.getItem("userId");

    const res = await fetch("http://localhost:5000/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newAnswer,
        userId,
        questionId: id,
      }),
    });

    const data = await res.json();
    setAnswers([data, ...answers]);
    setNewAnswer("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      {question ? (
        <>
          <h2 style={{ marginBottom: "10px" }}>{question.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: question.description }}
            style={{ marginBottom: "20px", background: "#f9f9f9", padding: "15px", borderRadius: "8px" }}
          ></div>

          <div style={{ marginBottom: "20px" }}>
            {question.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  marginRight: "8px",
                  background: "#d1e7dd",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <h3>Answers ({answers.length})</h3>
          {answers.map((ans, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: ans.content }}></div>
              <p style={{ fontSize: "12px", color: "#666" }}>
                — {ans.user?.username || "Anonymous"}
              </p>
              
            </div>
            
          ))}

          <h4 style={{ marginTop: "40px" }}>Post Your Answer</h4>
          <ReactQuill
            value={newAnswer}
            onChange={setNewAnswer}
            placeholder="Write your answer here..."
            style={{ marginBottom: "20px" }}
          />
          <button onClick={handlePostAnswer} style={{ padding: "10px 20px", background: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
            Submit Answer
          </button>
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default QuestionDetails;
