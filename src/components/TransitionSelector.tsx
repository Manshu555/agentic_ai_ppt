import React from 'react';
import { usePresentationContext } from '../context/PresentationContext';
import { Play, Check } from 'lucide-react';

const TransitionSelector = () => {
  const { availableTransitions, selectedTransition, setSelectedTransition } = usePresentationContext();

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose Transitions</h2>
      <p className="text-gray-600 mb-6">
        Select how slides will transition from one to another during your presentation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableTransitions.map((transition) => (
          <div 
            key={transition.id}
            onClick={() => setSelectedTransition(transition.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedTransition === transition.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{transition.name}</h3>
              {selectedTransition === transition.id ? (
                <Check className="h-5 w-5 text-blue-600" />
              ) : (
                <button 
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Preview transition"
                >
                  <Play className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">{transition.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransitionSelector;