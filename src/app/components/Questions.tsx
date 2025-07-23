// src/app/components/Questions.tsx
'use client';

import React, { useState } from 'react';
import './Questions.css';

const QuestionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

const questions = [
  {
    id: 1,
    title: 'VBA Excel Stack multiple columns together / transpose',
    summary: "Here is how the data is presented (it's in pivot table style but not a true pivot table)...",
    tags: ['excel', 'vba', 'loops'],
    views: 10,
    author: 'Sally Parkes',
    time: '7 mins ago',
  },
  {
    id: 2,
    title: 'How to get a random word in Python',
    summary: 'I am building a typing challenge, for that I need completely random 3–6 letter words...',
    tags: ['python'],
    views: 14,
    author: 'Raj',
    time: '12 mins ago',
  },
  {
    id: 3,
    title: 'How to center a div in CSS?',
    summary: 'I’ve tried using margin auto and flexbox but it still won’t center vertically and horizontally...',
    tags: ['css', 'html', 'layout'],
    views: 21,
    author: 'Lea Carter',
    time: '22 mins ago',
  },
  {
    id: 4,
    title: 'Null pointer exception in Java - how to debug it?',
    summary: 'I’m getting a null pointer exception in a method, how do I track down what’s causing it?',
    tags: ['java', 'exceptions', 'debugging'],
    views: 34,
    author: 'Ravi Patel',
    time: '30 mins ago',
  },
  {
    id: 5,
    title: 'Difference between let and var in JavaScript?',
    summary: 'Can someone explain the difference between let and var, and which should be used when?',
    tags: ['javascript', 'variables', 'es6'],
    views: 56,
    author: 'Anna Gomez',
    time: '42 mins ago',
  },
  {
    id: 6,
    title: 'Fetch vs Axios - What should I use?',
    summary: 'I’m making API requests from the browser. Is it better to use fetch or Axios?',
    tags: ['api', 'axios', 'fetch'],
    views: 19,
    author: 'Tom Becker',
    time: '1 hour ago',
  },
  {
    id: 7,
    title: 'How do I create responsive layouts in Tailwind CSS?',
    summary: 'I’m building a layout with Tailwind but it’s not adjusting properly on mobile...',
    tags: ['tailwind', 'responsive', 'css'],
    views: 29,
    author: 'Mira Kim',
    time: '1 hour ago',
  },
  {
    id: 8,
    title: 'PostgreSQL vs MySQL - Key differences?',
    summary: 'We’re choosing between PostgreSQL and MySQL for a new project. What are the practical differences?',
    tags: ['postgresql', 'mysql', 'database'],
    views: 47,
    author: 'Jonah Rivers',
    time: '2 hours ago',
  },
  {
    id: 9,
    title: 'How to pass props between components in React?',
    summary: 'I’m trying to pass data from a parent component to a child but nothing is showing up...',
    tags: ['react', 'props', 'components'],
    views: 31,
    author: 'Nia Johnson',
    time: '2 hours ago',
  },
  {
    id: 10,
    title: 'What’s the difference between == and === in JavaScript?',
    summary: 'I don’t understand why `==` and `===` behave differently when comparing values...',
    tags: ['javascript', 'operators', 'comparison'],
    views: 65,
    author: 'Luca Bianchi',
    time: '3 hours ago',
  },
];


  return (
    <div className="questions-container">
      {/* Title Row */}
      <div className="title-row">
        <h1 className="questions-title"  style={{ color: '#073a6d !important', paddingBottom: '50px' }}>Asked Questions & Answers</h1>
        <button className="ask-button">Ask Question</button>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-bar">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>

        <div className="filter-section">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Sort & Filter</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="python">Python</option>
            <option value="excel">Excel</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
      </div>

      {/* Question List */}
      <div className="question-list">
        {questions.map((q) => (
          <div key={q.id} className="question-item">
            <div className="question-content">
              <h2 className="question-title">{q.title}</h2>
              <p className="question-summary">{q.summary}</p>
              <div className="flex gap-2 mt-2">
                {q.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="question-meta">
              <p><strong>{q.views} views</strong></p>
              <p>Asked {q.time}</p>
              <p>By <strong>{q.author}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
