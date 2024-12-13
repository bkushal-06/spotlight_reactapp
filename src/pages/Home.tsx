import React from 'react';
import { useAuthStore } from '../store/authStore';
import { mockNews } from '../data/mockNews';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export const Home = () => {
  const { user, toggleFavorite } = useAuthStore();

  const breakingNews = mockNews.slice(0, 3);
  const preferredNews = mockNews.filter(news => 
    user?.preferences.includes(news.category)
  );

  return (
    <div className="space-y-8">
      {/* Breaking News Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Breaking News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {breakingNews.map(news => (
            <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{news.date}</span>
                  <button
                    onClick={() => toggleFavorite(news.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {user?.favorites.includes(news.id) ? (
                      <BookmarkCheck className="w-5 h-5" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preferred News Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Preferred News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preferredNews.map(news => (
            <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-sm text-white bg-indigo-600 rounded-full mb-2">
                  {news.category}
                </span>
                <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{news.date}</span>
                  <button
                    onClick={() => toggleFavorite(news.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {user?.favorites.includes(news.id) ? (
                      <BookmarkCheck className="w-5 h-5" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};