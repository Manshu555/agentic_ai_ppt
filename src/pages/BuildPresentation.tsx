import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePresentationContext } from '../context/PresentationContext';
import StepIndicator from '../components/StepIndicator';
import TemplateSelector from '../components/TemplateSelector';
import ContentEditor from '../components/ContentEditor';
import TransitionSelector from '../components/TransitionSelector';
import FinalizePresentation from '../components/FinalizePresentation';

const steps = [
  { id: 0, name: 'Template', description: 'Choose a design template' },
  { id: 1, name: 'Content', description: 'Add and edit content' },
  { id: 2, name: 'Transitions', description: 'Select slide transitions' },
  { id: 3, name: 'Finalize', description: 'Review and export' },
];

const BuildPresentation = () => {
  const navigate = useNavigate();
  const { topic, currentStep, setCurrentStep } = usePresentationContext();

  useEffect(() => {
    // Redirect to dashboard if no topic is set
    if (!topic) {
      navigate('/');
    }
  }, [topic, navigate]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <TemplateSelector />;
      case 1:
        return <ContentEditor />;
      case 2:
        return <TransitionSelector />;
      case 3:
        return <FinalizePresentation />;
      default:
        return <TemplateSelector />;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!topic) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Creating: {topic}</h1>
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        {renderStepContent()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } transition-colors`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className={`px-6 py-2 rounded-lg ${
            currentStep === steps.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default BuildPresentation;