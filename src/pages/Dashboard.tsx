import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Presentation, PlusCircle, BarChart3, FileText } from 'lucide-react';
import TopicPopup from '../components/TopicPopup';
import { usePresentationContext } from '../context/PresentationContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { setTopic } = usePresentationContext();
  const [showPopup, setShowPopup] = React.useState(false);

  const handleStartNew = () => {
    setShowPopup(true);
  };

  const handleTopicSubmit = (topic: string) => {
    setTopic(topic);
    setShowPopup(false);
    navigate('/build');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Beautiful Presentations with AI</h1>
          <p className="text-lg text-gray-600 mb-8">
            Our AI-powered presentation builder helps you create professional slides in minutes, not hours.
          </p>
          <button
            onClick={handleStartNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto transition-colors duration-300"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Presentation
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">1. Enter Your Topic</h3>
            <p className="text-gray-600 text-center">
              Tell us what your presentation is about, and our AI will handle the rest.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
              <Presentation className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">2. Customize Design</h3>
            <p className="text-gray-600 text-center">
              Choose from beautiful templates and customize elements to match your style.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">3. Export & Present</h3>
            <p className="text-gray-600 text-center">
              Review your presentation, make final adjustments, and export to your preferred format.
            </p>
          </div>
        </div>
      </section>

      {showPopup && <TopicPopup onSubmit={handleTopicSubmit} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Dashboard;