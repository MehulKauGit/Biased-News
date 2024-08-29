import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');

    const fetchNews = async () => {
        const response = await axios.get(`/api/news?query=${query}`);
        setArticles(response.data.articles);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">AI News Aggregator with Bias Detection</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Search for news..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={fetchNews}
                    className="bg-blue-500 text-white p-2 rounded ml-2"
                >
                    Search
                </button>
            </div>

            <div>
                {articles.map((article, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-2xl font-semibold">{article.title}</h2>
                        <p className="text-gray-600">{article.description}</p>
                        <p className="mt-2">
                            <strong>Bias Score:</strong> {article.biasScore.toFixed(2)}
                        </p>
                        <a
                            href={article.url}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
