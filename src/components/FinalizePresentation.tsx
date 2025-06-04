import React, { useState } from 'react';
import { usePresentationContext } from '../context/PresentationContext';
import { Download, ExternalLink, CheckCircle2 } from 'lucide-react';

const FinalizePresentation = () => {
  const { topic, slides, selectedTemplate, selectedTransition } = usePresentationContext();
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pptx');

  const handleExport = () => {
    setExporting(true);
    
    // Mock export process
    setTimeout(() => {
      setExporting(false);
      setExportSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Finalize Your Presentation</h2>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Presentation Summary</h3>
        <ul className="space-y-2 text-blue-700">
          <li><span className="font-medium">Topic:</span> {topic}</li>
          <li><span className="font-medium">Slides:</span> {slides.length}</li>
          <li><span className="font-medium">Template:</span> {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}</li>
          <li><span className="font-medium">Transition:</span> {selectedTransition.charAt(0).toUpperCase() + selectedTransition.slice(1)}</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Export Options</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedFormat('pptx')}
            className={`px-4 py-2 rounded-lg border ${
              selectedFormat === 'pptx' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } transition-colors`}
          >
            PowerPoint (.pptx)
          </button>
          <button
            onClick={() => setSelectedFormat('pdf')}
            className={`px-4 py-2 rounded-lg border ${
              selectedFormat === 'pdf' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } transition-colors`}
          >
            PDF Document (.pdf)
          </button>
          <button
            onClick={() => setSelectedFormat('canva')}
            className={`px-4 py-2 rounded-lg border ${
              selectedFormat === 'canva' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } transition-colors`}
          >
            Canva Project
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleExport}
          disabled={exporting || exportSuccess}
          className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium ${
            exporting 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : exportSuccess 
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
          } transition-colors`}
        >
          {exporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Exporting...
            </>
          ) : exportSuccess ? (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Exported Successfully!
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Export Presentation
            </>
          )}
        </button>
        
        <button
          className="flex-1 flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Open in {selectedFormat === 'canva' ? 'Canva' : selectedFormat === 'pptx' ? 'PowerPoint' : 'PDF Viewer'}
        </button>
      </div>
      
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
        <h3 className="font-medium text-amber-800 mb-2">Want to make further edits?</h3>
        <p className="text-amber-700 mb-3">
          You can continue editing your presentation by going back to previous steps.
        </p>
        <button
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Continue Editing
        </button>
      </div>
    </div>
  );
};

export default FinalizePresentation;