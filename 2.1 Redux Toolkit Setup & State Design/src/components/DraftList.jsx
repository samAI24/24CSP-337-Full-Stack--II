import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, toggleStatus } from '../redux/postsSlice';
import { setFilter } from '../redux/platformsSlice';
import {
  Trash2,
  CheckCircle,
  Clock,
  Globe,
  Search,
  Layers,
  Sparkles,
  Share2,
  Tag
} from 'lucide-react';

const DraftList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts || []);
  const availablePlatforms = useSelector((state) => state.platforms.availablePlatforms || []);
  const activeFilter = useSelector((state) => state.platforms.selectedFilter || 'all');

  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts based on platform and search query
  const filteredPosts = posts.filter((post) => {
    const matchesPlatform =
      activeFilter === 'all' || post.platforms?.includes(activeFilter);
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesPlatform && matchesSearch;
  });

  const getPlatformMeta = (platId) => {
    return availablePlatforms.find((p) => p.id === platId) || { name: platId, color: '#38bdf8' };
  };

  return (
    <div className="draft-list-card">
      <div className="draft-list-header">
        <div className="draft-title-wrap">
          <div className="draft-icon-box">
            <Layers size={20} className="icon-gradient" />
          </div>
          <div>
            <h2 className="draft-heading">Redux Centralized Post Store</h2>
            <p className="draft-sub">
              Reading state directly via <code className="code-inline">useSelector()</code> & updating via <code className="code-inline">useDispatch()</code>
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-controls">
        <div className="search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Filter posts by keyword, tag, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="platform-filter-tabs">
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('all'))}
          >
            All ({posts.length})
          </button>
          {availablePlatforms.map((plat) => {
            const count = posts.filter((p) => p.platforms?.includes(plat.id)).length;
            return (
              <button
                type="button"
                key={plat.id}
                className={`filter-tab ${activeFilter === plat.id ? 'active' : ''}`}
                onClick={() => dispatch(setFilter(plat.id))}
              >
                {plat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts List */}
      <div className="posts-feed">
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <Layers size={40} className="empty-icon" />
            <h3>No posts found in Redux Store</h3>
            <p>Create a new post using the composer above to inspect centralized state management in action.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className={`post-card ${post.status.toLowerCase()}`}>
              <div className="post-card-header">
                <div className="post-meta-left">
                  <span
                    className={`status-badge ${post.status === 'Published' ? 'published' : 'draft'}`}
                  >
                    {post.status === 'Published' ? (
                      <CheckCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {post.status}
                  </span>
                  <span className="post-time">
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="post-actions">
                  <button
                    type="button"
                    className="action-btn toggle"
                    title={post.status === 'Published' ? 'Revert to Draft' : 'Publish Post'}
                    onClick={() => dispatch(toggleStatus(post.id))}
                  >
                    {post.status === 'Published' ? 'Set as Draft' : 'Publish Now'}
                  </button>
                  <button
                    type="button"
                    className="action-btn delete"
                    title="Delete Post from Store"
                    onClick={() => dispatch(deletePost(post.id))}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-card-content">{post.content}</p>

              {/* Target Platform Badges */}
              <div className="post-footer">
                <div className="platform-badges">
                  {post.platforms?.map((platId) => {
                    const meta = getPlatformMeta(platId);
                    return (
                      <span
                        key={platId}
                        className="post-platform-pill"
                        style={{ color: meta.color, borderColor: `${meta.color}40` }}
                      >
                        <Globe size={12} />
                        {meta.name}
                      </span>
                    );
                  })}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((t) => (
                      <span key={t} className="post-tag-item">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DraftList;
