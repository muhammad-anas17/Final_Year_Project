// NewsSection.jsx

import React from 'react';
import './NewsSection.css'; // Import the CSS file

const NewsSection = () => {
  const newsItems = [
    {
      title: 'Important Application Deadline Update',
      date: 'January 15, 2023',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    // Add more news items as needed
  ];

  return (
    <div className="news-section">
      <h2>News and Updates</h2>
      <ul>
        {newsItems.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p className="news-date">{item.date}</p>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;
