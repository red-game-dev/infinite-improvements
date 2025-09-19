import Image from 'next/image';
import { ImageData } from '@/data/types';

interface ImageCardProps {
  image: ImageData;
  className?: string;
}

export default function ImageCard({ image, className = '' }: ImageCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${className}`}>
      <div className="relative aspect-video">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {image.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {image.description}
        </p>
      </div>
    </div>
  );
}