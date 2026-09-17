import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Terminal, Copy, Check, Code2, Database } from 'lucide-react';

const StateInspector = () => {
  const fullState = useSelector((state) => state);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(fullState, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="state-inspector-card">
      <div className="inspector-header">
        <div className="inspector-title">
          <Database size={18} className="text-accent" />
          <span>Redux Global Store Live State Tree</span>
          <span className="live-badge">Single Source of Truth</span>
        </div>
        <div className="inspector-actions">
          <button
            type="button"
            className="inspector-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <button type="button" className="inspector-btn" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied JSON' : 'Copy State'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="inspector-code-wrap">
          <pre className="inspector-pre">
            <code>{JSON.stringify(fullState, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default StateInspector;
