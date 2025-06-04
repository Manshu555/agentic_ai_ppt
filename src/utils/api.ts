import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export interface Slide {
  id: string;
  title: string;
  content: string;
  notes?: string;
  layout: string;
  image?: string;
}

export const generateContent = async (topic: string, template: string): Promise<Slide[]> => {
  try {
    const prompt = `Create a presentation about "${topic}" with the following structure:
    1. Title slide
    2. Introduction
    3. Key Points
    4. Benefits
    5. Case Study
    6. Conclusion
    7. Q&A
    
    For each slide, provide:
    - A clear title
    - Relevant content
    - Speaker notes where appropriate`;

    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
      },
    });

    // Parse the generated content into slides
    const content = response.generated_text;
    const slides = parseContentIntoSlides(content);
    
    return slides;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

const parseContentIntoSlides = (content: string): Slide[] => {
  // This is a simplified parser - in production, you'd want more robust parsing
  const sections = content.split(/\d\.\s+/).filter(Boolean);
  
  return sections.map((section, index) => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    
    return {
      id: `slide-${index + 1}`,
      title,
      content,
      layout: index === 0 ? 'title-only' : 'standard',
      notes: '',
    };
  });
};

export const searchImages = async (query: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );
    
    const data = await response.json();
    return data.photos.map((photo: any) => photo.src.large);
  } catch (error) {
    console.error('Error searching images:', error);
    return [];
  }
};