import React from 'react';
import { useAuthStore } from '../store/authStore';
import { mockNews } from '../data/mockNews';
import { Settings, Clock, BookmarkCheck } from 'lucide-react';

const NEWS_CATEGORIES = [
  'Technology', 'Science', 'Business', 'Politics',
  'Entertainment', 'Sports', 'Health', 'World'
];

export const Dashboard = () => {
  const { user, updatePreferences } = useAuthStore();
  const favoriteNews = mockNews.filter(news => user?.favorites.includes(news.id));

  const togglePreference = (category: string) => {
    if (!user) return;
    const newPreferences = user.preferences.includes(category)
      ? user.preferences.filter(p => p !== category)
      : [...user.preferences, category];
    updatePreferences(newPreferences);
  };

  return (
    <div className="space-y-8">
      {/* User Info Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <Settings className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
            <p className="text-gray-600">Name: {user?.name}</p>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Last Visit</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{new Date(user?.lastVisit || '').toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">News Preferences</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {NEWS_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => togglePreference(category)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                user?.preferences.includes(category)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Favorites Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <BookmarkCheck className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold">Saved Articles</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteNews.map(news => (
            <div key={news.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h4 className="font-medium mb-1">{news.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{news.description}</p>
                <span className="text-xs text-gray-500">{news.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};