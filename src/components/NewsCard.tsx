import React from 'react';
import { Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  url: string;
  category?: string;
}

export const NewsCard = ({
  id,
  title,
  description,
  imageUrl,
  date,
  url,
  category,
}: NewsCardProps) => {
  const { user, toggleFavorite } = useAuthStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
      <img
        src={imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167'}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        {category && (
          <span className="inline-block px-2 py-1 text-sm text-white bg-purple-600 rounded-full mb-2">
            {category}
          </span>
        )}
        <h3 className="font-bold text-lg mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(date).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button
              onClick={() => toggleFavorite(id)}
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
            >
              {user?.favorites.includes(id) ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};