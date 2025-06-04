import React, { createContext, useContext, useState } from 'react';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

interface Transition {
  id: string;
  name: string;
  description: string;
}

interface PresentationContextType {
  topic: string;
  setTopic: (topic: string) => void;
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
  selectedTransition: string;
  setSelectedTransition: (transitionId: string) => void;
  slides: any[];
  setSlides: (slides: any[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  availableTemplates: Template[];
  availableTransitions: Transition[];
}

const defaultContextValue: PresentationContextType = {
  topic: '',
  setTopic: () => {},
  selectedTemplate: '',
  setSelectedTemplate: () => {},
  selectedTransition: '',
  setSelectedTransition: () => {},
  slides: [],
  setSlides: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  availableTemplates: [
    { id: 'minimal', name: 'Minimal', thumbnail: 'https://via.placeholder.com/150?text=Minimal' },
    { id: 'corporate', name: 'Corporate', thumbnail: 'https://via.placeholder.com/150?text=Corporate' },
    { id: 'creative', name: 'Creative', thumbnail: 'https://via.placeholder.com/150?text=Creative' },
    { id: 'academic', name: 'Academic', thumbnail: 'https://via.placeholder.com/150?text=Academic' },
  ],
  availableTransitions: [
    { id: 'fade', name: 'Fade', description: 'Smooth fade transition between slides' },
    { id: 'slide', name: 'Slide', description: 'Slides move from right to left' },
    { id: 'zoom', name: 'Zoom', description: 'Zoom effect between slides' },
    { id: 'none', name: 'None', description: 'No transition effect' },
  ],
};

const PresentationContext = createContext<PresentationContextType>(defaultContextValue);

export const usePresentationContext = () => useContext(PresentationContext);

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topic, setTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedTransition, setSelectedTransition] = useState('fade');
  const [slides, setSlides] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <PresentationContext.Provider
      value={{
        topic,
        setTopic,
        selectedTemplate,
        setSelectedTemplate,
        selectedTransition,
        setSelectedTransition,
        slides,
        setSlides,
        currentStep,
        setCurrentStep,
        availableTemplates: defaultContextValue.availableTemplates,
        availableTransitions: defaultContextValue.availableTransitions,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};