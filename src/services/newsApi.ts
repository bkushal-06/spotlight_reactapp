import axios from 'axios';

const API_KEY = 'e51ede4618b9429fa22f3db7d89b6649'; // Free API key from RapidAPI
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});

export const getTopHeadlines = async (category?: string) => {
  const params = {
    country: 'us',
    ...(category && { category }),
  };
  
  try {
    const response = await newsApi.get('/top-headlines', { params });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const searchNews = async (query: string) => {
  try {
    const response = await newsApi.get('/everything', {
      params: { q: query },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error);
    return [];
  }
};