import { sleep } from './helpers';

export interface Slide {
  id: string;
  title: string;
  content: string;
  notes?: string;
  layout: string;
}

// Mock API call to simulate fetching from Hugging Face
export const mockApiCall = async (topic: string, template: string): Promise<Slide[]> => {
  try {
    // Simulate API delay
    await sleep(2000);
    
    // Generate mock slides based on the topic
    const slides: Slide[] = [];
    
    // Title slide
    slides.push({
      id: 'slide-1',
      title: topic,
      content: 'Presentation by AI Assistant',
      layout: 'title-only',
    });
    
    // Introduction slide
    slides.push({
      id: 'slide-2',
      title: 'Introduction',
      content: `This presentation explores the topic of ${topic}. We'll cover key points, benefits, and practical applications.`,
      notes: 'Introduce yourself and explain why this topic matters',
      layout: 'standard',
    });
    
    // Key Points slide
    slides.push({
      id: 'slide-3',
      title: 'Key Points',
      content: '• First important point about the topic\n• Second key aspect to consider\n• Third critical element\n• Fourth significant factor',
      notes: 'Emphasize the most important points',
      layout: 'standard',
    });
    
    // Benefits slide
    slides.push({
      id: 'slide-4',
      title: 'Benefits',
      content: 'Left column: Primary benefits\n- Improved efficiency\n- Cost reduction\n- Enhanced productivity\n\nRight column: Secondary benefits\n- Better user experience\n- Increased reliability\n- Future-proof solution',
      notes: 'Highlight the main benefits for your audience',
      layout: 'two-column',
    });
    
    // Case Study slide
    slides.push({
      id: 'slide-5',
      title: 'Case Study',
      content: 'A brief description of a real-world example where this topic has been successfully applied, highlighting the challenges, solutions, and outcomes.',
      notes: 'Share a specific example that your audience can relate to',
      layout: 'image-right',
    });
    
    // Conclusion slide
    slides.push({
      id: 'slide-6',
      title: 'Conclusion',
      content: '• Summary of key points\n• Call to action\n• Next steps\n• Contact information for follow-up',
      notes: 'Wrap up and provide clear next steps',
      layout: 'standard',
    });
    
    // Questions slide
    slides.push({
      id: 'slide-7',
      title: 'Questions?',
      content: 'Thank you for your attention!\n\nAny questions or feedback?',
      layout: 'title-only',
    });
    
    return slides;
  } catch (error) {
    console.error('Mock API Error:', error);
    throw new Error('Failed to generate slides. Please try again.');
  }
};

// Mock function to generate content with AI
export const generateContentWithAI = async (prompt: string): Promise<string> => {
  try {
    // Simulate AI processing delay
    await sleep(1000);
    
    // Return mock generated content
    return `Generated content based on: "${prompt}"\n\nThis is where the AI-generated content would appear. In a real implementation, this would be fetched from a language model API like Hugging Face.`;
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};

// Mock function to search for images
export const searchImages = async (query: string): Promise<string[]> => {
  try {
    // Simulate search delay
    await sleep(1500);
    
    // Return mock image URLs
    return [
      'https://via.placeholder.com/400x300?text=Image+1',
      'https://via.placeholder.com/400x300?text=Image+2',
      'https://via.placeholder.com/400x300?text=Image+3',
      'https://via.placeholder.com/400x300?text=Image+4',
    ];
  } catch (error) {
    console.error('Image Search Error:', error);
    throw new Error('Failed to search for images. Please try again.');
  }
};