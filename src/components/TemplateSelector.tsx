import React from 'react';
import { usePresentationContext } from '../context/PresentationContext';
import { Check } from 'lucide-react';

const TemplateSelector = () => {
  const { availableTemplates, selectedTemplate, setSelectedTemplate } = usePresentationContext();

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose a Template</h2>
      <p className="text-gray-600 mb-6">
        Select a design template that best fits your presentation needs.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableTemplates.map((template) => (
          <div 
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedTemplate === template.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
            } rounded-lg overflow-hidden`}
          >
            <img 
              src={template.thumbnail} 
              alt={template.name} 
              className="w-full aspect-video object-cover"
            />
            <div className="p-3 bg-white border-t border-gray-100">
              <h3 className="font-medium text-gray-900">{template.name}</h3>
            </div>
            
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!selectedTemplate && (
        <p className="mt-4 text-amber-600">Please select a template to continue.</p>
      )}
    </div>
  );
};

export default TemplateSelector;