import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectPosts,
  totalPosts,
  shortPosts,
  longPosts,
} from "../selectors/selectors";
import { addPost, deletePost } from "../store/postsSlice";

function Dashboard() {
  const posts = useSelector(selectPosts) || [];

  const total = useSelector(totalPosts) || 0;
  const short = useSelector(shortPosts) || 0;
  const long = useSelector(longPosts) || 0;

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const dispatch = useDispatch();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    dispatch(addPost(newTitle.trim()));
    setNewTitle("");
    setShowAddForm(false);
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="container">
      {/* Header Info & Performance Notice */}
      <div className="performance-banner">
        <div className="banner-icon">⚡</div>
        <div className="banner-text">
          <strong>Memoized Selectors Active:</strong> Using <code>createSelector</code> to prevent unnecessary re-computations of state metrics.
        </div>
      </div>

      {/* Search Bar & Action Bar */}
      <div className="action-bar">
        <div className="search-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search Posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch("")} title="Clear search">
              ✕
            </button>
          )}
        </div>

        <button 
          className="btn-add-toggle" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "+ Add New Post"}
        </button>
      </div>

      {/* Add Post Form */}
      {showAddForm && (
        <form className="add-post-form" onSubmit={handleAddPost}>
          <input
            type="text"
            placeholder="Enter post title (e.g. Redux Reselect Deep Dive)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-submit">
            Add Post
          </button>
        </form>
      )}

      {/* Statistics Cards */}
      <div className="cards">
        <div className="card card-total">
          <div className="card-header">
            <span className="card-icon">📚</span>
            <h3>Total Posts</h3>
          </div>
          <p>{total}</p>
          <span className="card-subtext">All items in Redux store</span>
        </div>

        <div className="card card-short">
          <div className="card-header">
            <span className="card-icon">⚡</span>
            <h3>Short Posts</h3>
          </div>
          <p>{short}</p>
          <span className="card-subtext">Title &lt; 15 characters</span>
        </div>

        <div className="card card-long">
          <div className="card-header">
            <span className="card-icon">📖</span>
            <h3>Long Posts</h3>
          </div>
          <p>{long}</p>
          <span className="card-subtext">Title &ge; 15 characters</span>
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-header">
        <h2>Posts</h2>
        <span className="posts-count-badge">
          Showing {filteredPosts.length} of {posts.length}
        </span>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No posts found</h3>
          <p>No titles matched your search query "{search}". Try searching for something else.</p>
        </div>
      ) : (
        <div className="posts-list">
          {filteredPosts.map((post) => {
            const isShort = post.title.length < 15;
            return (
              <div key={post.id} className="post">
                <div className="post-content">
                  <span className="post-id">#{post.id}</span>
                  <span className="post-title">{post.title}</span>
                </div>
                <div className="post-actions">
                  <span className={`badge ${isShort ? "badge-short" : "badge-long"}`}>
                    {isShort ? "Short (<15)" : "Long (≥15)"}
                  </span>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDeletePost(post.id)}
                    title="Delete Post"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
