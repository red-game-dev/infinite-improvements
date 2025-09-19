import { ImageData } from '@/data/types';
import ImageCard from './ImageCard';

interface ImageGalleryProps {
  images: ImageData[];
  title?: string;
}

export default function ImageGallery({ images, title = 'Image Gallery' }: ImageGalleryProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard 
            key={image.id} 
            image={image}
            className="transform transition-all duration-200"
          />
        ))}
      </div>
    </div>
  );
}