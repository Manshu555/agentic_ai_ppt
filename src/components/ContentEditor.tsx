import React, { useState, useEffect } from 'react';
import { usePresentationContext } from '../context/PresentationContext';
import { PlusCircle, Trash2, ArrowUpDown, Image } from 'lucide-react';
import SlidePreview from './SlidePreview';
import { mockApiCall } from '../utils/mockApi';

const ContentEditor = () => {
  const { topic, selectedTemplate, slides, setSlides } = usePresentationContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const generateInitialContent = async () => {
      if (slides.length === 0) {
        setLoading(true);
        setError(null);
        try {
          const generatedSlides = await mockApiCall(topic, selectedTemplate);
          setSlides(generatedSlides);
          setActiveSlide(0);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unexpected error occurred');
          console.error('Error generating slides:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    generateInitialContent();
  }, [topic, selectedTemplate, slides.length, setSlides]);

  const handleUpdateSlideContent = (slideIndex: number, content: any) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], ...content };
    setSlides(updatedSlides);
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-${slides.length + 1}`,
      title: 'New Slide',
      content: '',
      notes: '',
      layout: 'standard',
    };
    setSlides([...slides, newSlide]);
    setActiveSlide(slides.length);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) {
      return; // Don't delete the last slide
    }
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    
    // Update active slide if needed
    if (activeSlide === index) {
      setActiveSlide(Math.max(0, index - 1));
    } else if (activeSlide > index) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleReorderSlide = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= slides.length) return;
    
    const updatedSlides = [...slides];
    const [movedSlide] = updatedSlides.splice(fromIndex, 1);
    updatedSlides.splice(toIndex, 0, movedSlide);
    
    setSlides(updatedSlides);
    setActiveSlide(toIndex);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Generating presentation content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No slides available. Please go back and select a template.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Slides sidebar */}
      <div className="lg:w-1/4 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Slides</h3>
          <button
            onClick={handleAddSlide}
            className="text-blue-600 hover:text-blue-700 transition-colors"
            title="Add new slide"
          >
            <PlusCircle className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                activeSlide === index ? 'bg-blue-100' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="w-10 h-10 bg-white border border-gray-200 rounded mr-3 flex items-center justify-center text-xs text-gray-500">
                {index + 1}
              </div>
              <div className="flex-grow truncate">
                <p className="text-sm font-medium text-gray-900 truncate">{slide.title}</p>
                <p className="text-xs text-gray-500 truncate">{slide.layout}</p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReorderSlide(index, index - 1);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={index === 0}
                  title="Move up"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSlide(index);
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  disabled={slides.length <= 1}
                  title="Delete slide"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Editor main area */}
      <div className="lg:w-3/4">
        {slides[activeSlide] && (
          <>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <SlidePreview slide={slides[activeSlide]} template={selectedTemplate} />
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="slide-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Slide Title
                </label>
                <input
                  id="slide-title"
                  type="text"
                  value={slides[activeSlide].title}
                  onChange={(e) => handleUpdateSlideContent(activeSlide, { title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="slide-content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="slide-content"
                  value={slides[activeSlide].content}
                  onChange={(e) => handleUpdateSlideContent(activeSlide, { content: e.target.value })}
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                  <Image className="h-4 w-4 mr-2" />
                  Add Image
                </button>
                
                <select
                  value={slides[activeSlide].layout}
                  onChange={(e) => handleUpdateSlideContent(activeSlide, { layout: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="standard">Standard Layout</option>
                  <option value="title-only">Title Only</option>
                  <option value="two-column">Two Columns</option>
                  <option value="image-left">Image Left</option>
                  <option value="image-right">Image Right</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="slide-notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Speaker Notes
                </label>
                <textarea
                  id="slide-notes"
                  value={slides[activeSlide].notes || ''}
                  onChange={(e) => handleUpdateSlideContent(activeSlide, { notes: e.target.value })}
                  rows={3}
                  placeholder="Add notes for this slide (only visible to you)"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;