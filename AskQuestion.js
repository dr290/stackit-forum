import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please enter both title and description.");
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);

    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          userId,
          tags: ["React", "MongoDB"], // Hardcoded tags for now
        }),
      });

      const data = await res.json();
      console.log("Question submitted:", data);

      setTitle("");
      setDescription("");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit question.");
    }

    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #eee",
        borderRadius: "10px",
        background: "#fafafa",
        boxShadow: "0 0 15px rgba(0,0,0,0.05)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        📝 Ask a Question
      </h2>

      {/* Title Input */}
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
        Title
      </label>
      <input
        type="text"
        placeholder="Enter a clear, descriptive title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "70%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {/* Rich Text Editor */}
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
        Description
      </label>
      <div style={{ marginBottom: "30px" }}>
        <ReactQuill
          value={description}
          onChange={setDescription}
          theme="snow"
          placeholder="Explain your question in detail..."
          style={{
            width:"100%",
            height: "200px",
            backgroundColor: "white",
            borderRadius: "6px",
          }}
        />
      </div>
        <br></br>
      {/* Submit Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: isSubmitting ? "#999" : "#007BFF",
            color: "#fff",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Question"}
        </button>

        {submitted && (
          <p style={{ color: "green", marginTop: "15px" }}>
            ✅ Question submitted successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default AskQuestion;
