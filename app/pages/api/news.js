import axios from "axios";
import Sentiment from "sentiment";

const API_KEY = process.env.NEWS_API_KEY; // Store your NewsAPI key in .env.local

const fetchNews = async (query, language = 'en', pageSize = 10) => {
    const url = `https://newsapi.org/v2/everything?q=${query}&language=${language}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.articles;
};

const detectBias = (text) => {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    return result.score;
};

export default async function handler(req, res) {
    const { query } = req.query;
    const articles = await fetchNews(query || 'technology');

    const analyzedArticles = articles.map((article) => {
        const biasScore = detectBias(article.description || article.content || 'No content available');
        return { ...article, biasScore };
    });

    res.status(200).json({ articles: analyzedArticles });
}