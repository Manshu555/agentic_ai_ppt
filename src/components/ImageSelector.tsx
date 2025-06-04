import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { searchImages } from '../utils/api';

interface ImageSelectorProps {
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
  initialQuery: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect, onClose, initialQuery }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    searchImages(searchQuery).then((results) => {
      setImages(results);
      setLoading(false);
    });
  }, [searchQuery]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-4 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select an Image</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for images..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  onClick={() => onSelect(imageUrl)}
                  className="aspect-video cursor-pointer rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                >
                  <img
                    src={imageUrl}
                    alt={`Search result ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;