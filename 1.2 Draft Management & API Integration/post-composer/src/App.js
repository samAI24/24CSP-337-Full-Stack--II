import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load drafts from localStorage
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(savedDrafts);
  }, []);

  // Save drafts to localStorage
  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  // Save or Update Draft
  const saveDraft = () => {
    if (post.trim() === "") {
      setMessage("Please enter some content.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (editingIndex !== null) {
        const updatedDrafts = [...drafts];
        updatedDrafts[editingIndex] = post;
        setDrafts(updatedDrafts);
        setEditingIndex(null);
        setMessage("Draft updated successfully.");
      } else {
        setDrafts([...drafts, post]);
        setMessage("Draft saved successfully.");
      }

      setPost("");
      setLoading(false);
    }, 800);
  };

  // Edit Draft
  const editDraft = (index) => {
    setPost(drafts[index]);
    setEditingIndex(index);
    setMessage("Editing draft...");
  };

  // Delete Draft
  const deleteDraft = (index) => {
    const updatedDrafts = drafts.filter((_, i) => i !== index);
    setDrafts(updatedDrafts);

    if (editingIndex === index) {
      setEditingIndex(null);
      setPost("");
    }

    setMessage("Draft deleted successfully.");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Draft Management System</h1>

      <textarea
        rows="6"
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <br />
      <br />

      <button
        onClick={saveDraft}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {editingIndex !== null ? "Update Draft" : "Save Draft"}
      </button>

      {loading && (
        <p style={{ color: "blue" }}>Saving draft...</p>
      )}

      {message && (
        <p style={{ color: "green" }}>{message}</p>
      )}

      <hr />

      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No drafts available.</p>
      ) : (
        drafts.map((draft, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <p>{draft}</p>

            <button
              onClick={() => editDraft(index)}
              style={{
                marginRight: "10px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteDraft(index)}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;