import React from 'react';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="py-4">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <li 
              key={step.id} 
              className={`flex items-center ${index < steps.length - 1 ? 'w-full' : ''}`}
            >
              <div className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isCompleted 
                      ? 'bg-blue-600' 
                      : isActive 
                        ? 'bg-blue-100 border-2 border-blue-600' 
                        : 'bg-gray-100'
                  } transition-colors duration-300`}
                >
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5 text-white\" aria-hidden="true\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 16 12">
                      <path stroke="currentColor\" strokeLinecap="round\" strokeLinejoin="round\" strokeWidth="2\" d="M1 5.917 5.724 10.5 15 1.5"/>
                    </svg>
                  ) : (
                    <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <span className={`text-sm font-medium mt-1 ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                } transition-colors duration-300`}></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default StepIndicator;