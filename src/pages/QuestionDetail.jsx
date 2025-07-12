import React from "react";
import { useParams } from "react-router-dom";

export default function QuestionDetail() {
  const { id } = useParams();
  return (
    <div>
      <h2>Question #{id}</h2>
      <p>Question details will be fetched from backend</p>
    </div>
  );
}