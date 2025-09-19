'use client';

import { ImagesCollection } from '@/data/types';
import ImageGallery from '@/components/ImageGallery';
import { useImages } from '@/hooks/useImages';
import imagesData from '@/data/images.json';

export default function Home() {
  const { images, loading, error } = useImages();
  
  // Also demonstrate direct import and prop passing
  const staticImages = (imagesData as ImagesCollection).images;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Infinite Improvements
          </h1>
          <p className="text-gray-600 text-center mt-2">
            A Next.js demo showcasing component architecture and external image handling
          </p>
        </div>
      </header>

      <main>
        {/* Gallery using hook data */}
        <ImageGallery 
          images={images} 
          title="Dynamic Gallery (via Hook)" 
        />
        
        {/* Gallery using direct import and prop passing */}
        <div className="bg-white py-8">
          <ImageGallery 
            images={staticImages.slice(0, 3)} 
            title="Static Gallery (Direct Import)" 
          />
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Infinite Improvements. Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
