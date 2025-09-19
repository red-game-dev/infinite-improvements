export interface ImageData {
  id: number;
  title: string;
  url: string;
  alt: string;
  description: string;
}

export interface ImagesCollection {
  images: ImageData[];
}