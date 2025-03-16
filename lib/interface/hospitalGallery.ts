export interface GalleryImage {
    imageUrl: string;
    imageDescription: string;
  }
  



  export interface NewsMediaImage {
    id: number;
    imageUrl: string;
    createdAt: string;  // You can use 'string' to represent ISO date format, or 'Date' if you want to work with Date objects
    updatedAt: string;  // Same as above
  }