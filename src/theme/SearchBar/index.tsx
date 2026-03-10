import React from 'react';

export default function SearchBar(): React.JSX.Element {
  return (
    <button className="ask-ai-trigger" type="button" aria-label="Ask AI">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      Ask AI
      <kbd>⌘K</kbd>
    </button>
  );
}
