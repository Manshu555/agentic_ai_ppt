import React from 'react';
import type { Slide } from '../utils/api';

interface SlidePreviewProps {
  slide: Slide;
  template: string;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({ slide, template }) => {
  const getTemplateStyles = () => {
    switch (template) {
      case 'minimal':
        return {
          bg: 'bg-white',
          titleClass: 'text-2xl font-light text-gray-900',
          contentClass: 'text-gray-700',
        };
      case 'corporate':
        return {
          bg: 'bg-blue-50',
          titleClass: 'text-2xl font-bold text-blue-900',
          contentClass: 'text-blue-800',
        };
      case 'creative':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
          titleClass: 'text-2xl font-semibold text-purple-800',
          contentClass: 'text-purple-700',
        };
      case 'academic':
        return {
          bg: 'bg-amber-50',
          titleClass: 'text-2xl font-serif text-amber-900',
          contentClass: 'text-amber-800 font-serif',
        };
      default:
        return {
          bg: 'bg-white',
          titleClass: 'text-2xl font-medium text-gray-900',
          contentClass: 'text-gray-700',
        };
    }
  };

  const templateStyles = getTemplateStyles();

  const renderLayout = () => {
    switch (slide.layout) {
      case 'title-only':
        return (
          <div className="flex items-center justify-center h-full">
            <h2 className={`${templateStyles.titleClass} text-center`}>{slide.title}</h2>
          </div>
        );
      case 'two-column':
        return (
          <div className="h-full flex flex-col">
            <h2 className={`${templateStyles.titleClass} mb-4`}>{slide.title}</h2>
            <div className="flex flex-1 gap-4">
              <div className={`w-1/2 ${templateStyles.contentClass}`}>
                {slide.content.split('\n\n')[0] || 'Left column content'}
              </div>
              <div className={`w-1/2 ${templateStyles.contentClass}`}>
                {slide.content.split('\n\n')[1] || 'Right column content'}
              </div>
            </div>
          </div>
        );
      case 'image-left':
        return (
          <div className="h-full flex flex-col">
            <h2 className={`${templateStyles.titleClass} mb-4`}>{slide.title}</h2>
            <div className="flex flex-1 gap-4">
              <div className="w-1/2 bg-gray-200 flex items-center justify-center overflow-hidden rounded">
                {slide.image ? (
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">[Image placeholder]</span>
                )}
              </div>
              <div className={`w-1/2 ${templateStyles.contentClass}`}>{slide.content}</div>
            </div>
          </div>
        );
      case 'image-right':
        return (
          <div className="h-full flex flex-col">
            <h2 className={`${templateStyles.titleClass} mb-4`}>{slide.title}</h2>
            <div className="flex flex-1 gap-4">
              <div className={`w-1/2 ${templateStyles.contentClass}`}>{slide.content}</div>
              <div className="w-1/2 bg-gray-200 flex items-center justify-center overflow-hidden rounded">
                {slide.image ? (
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">[Image placeholder]</span>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex flex-col">
            <h2 className={`${templateStyles.titleClass} mb-4`}>{slide.title}</h2>
            <div className={`${templateStyles.contentClass}`}>{slide.content}</div>
          </div>
        );
    }
  };

  return (
    <div className={`aspect-[16/9] ${templateStyles.bg} p-8 rounded-lg shadow-sm overflow-hidden`}>
      {renderLayout()}
    </div>
  );
};

export default SlidePreview;