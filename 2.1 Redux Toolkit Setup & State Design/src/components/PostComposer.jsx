import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/postsSlice';
import { Send, FilePlus, Sparkles, Tag, Globe, MessageSquare } from 'lucide-react';

const PostComposer = () => {
  const dispatch = useDispatch();
  const availablePlatforms = useSelector((state) => state.platforms.availablePlatforms || []);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin']);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Redux', 'StateManagement']);

  const handlePlatformToggle = (id) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/^#/, '');
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (statusToSet = 'Draft') => {
    if (!content.trim()) return;

    dispatch(
      addPost({
        title: title.trim() || 'Untitled Social Update',
        content: content.trim(),
        platforms: selectedPlatforms,
        status: statusToSet,
        tags: tags,
      })
    );

    // Reset composer form
    setTitle('');
    setContent('');
  };

  return (
    <div className="composer-card">
      <div className="composer-header">
        <div className="composer-title-wrap">
          <div className="composer-icon-box">
            <FilePlus size={20} className="icon-gradient" />
          </div>
          <div>
            <h2 className="composer-heading">Create Social Post</h2>
            <p className="composer-sub">Dispatches centralized state mutation to Redux Store</p>
          </div>
        </div>
      </div>

      <div className="composer-body">
        {/* Post Title */}
        <div className="form-group">
          <label className="form-label">Post Headline / Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Implementing Centralized Redux Toolkit State Engine..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Post Content */}
        <div className="form-group">
          <label className="form-label">Post Content & Insights</label>
          <textarea
            className="form-textarea"
            rows="4"
            placeholder="Write your post content here... Redux Toolkit allows seamless state updates across components."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="char-count-row">
            <span>{content.length} characters</span>
            {selectedPlatforms.includes('twitter') && (
              <span className={content.length > 280 ? 'text-danger' : 'text-muted'}>
                Twitter Limit: 280 chars
              </span>
            )}
          </div>
        </div>

        {/* Target Platforms */}
        <div className="form-group">
          <label className="form-label">Target Social Platforms</label>
          <div className="platform-selector-grid">
            {availablePlatforms.map((plat) => {
              const isSelected = selectedPlatforms.includes(plat.id);
              return (
                <button
                  type="button"
                  key={plat.id}
                  onClick={() => handlePlatformToggle(plat.id)}
                  className={`platform-chip ${isSelected ? 'selected' : ''}`}
                  style={{
                    '--chip-color': plat.color,
                    '--chip-bg': plat.bgColor,
                  }}
                >
                  <Globe size={14} />
                  <span>{plat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hashtags Input */}
        <div className="form-group">
          <label className="form-label">Hashtags / Category Tags</label>
          <div className="tags-container">
            {tags.map((tag) => (
              <span key={tag} className="tag-badge">
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="tag-remove-btn"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              className="tag-inline-input"
              placeholder="Add tag and press Enter..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="composer-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleSubmit('Draft')}
            disabled={!content.trim()}
          >
            <FilePlus size={16} />
            Save as Draft
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit('Published')}
            disabled={!content.trim()}
          >
            <Send size={16} />
            Publish Immediately
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
