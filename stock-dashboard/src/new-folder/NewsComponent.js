import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsComponent = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/edu/articles')
            .then(response => setNews(response.data))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    return (
        <div className="news-container">
            <h2>Latest Stock News</h2>
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsComponent;
