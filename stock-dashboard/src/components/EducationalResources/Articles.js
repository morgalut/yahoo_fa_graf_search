import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/edu/articles')
            .then(response => setArticles(response.data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div>
            <h1>Articles</h1>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h2>{article.title}</h2>
                        <p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Read more
                            </a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;
