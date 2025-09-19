import { useState, useEffect } from 'react';
import { ImageData, ImagesCollection } from '@/data/types';
import imagesData from '@/data/images.json';

export function useImages() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate a small delay to demonstrate loading state
      const timer = setTimeout(() => {
        const data = imagesData as ImagesCollection;
        setImages(data.images);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } catch {
      setError('Failed to load images');
      setLoading(false);
    }
  }, []);

  const getImageById = (id: number): ImageData | undefined => {
    return images.find(image => image.id === id);
  };

  const getRandomImages = (count: number): ImageData[] => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return {
    images,
    loading,
    error,
    getImageById,
    getRandomImages,
  };
}