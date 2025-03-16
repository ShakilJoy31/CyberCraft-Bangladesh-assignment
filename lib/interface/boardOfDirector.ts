export interface BoardOfDirector {
    id: number;
    description: string;
    designation: string;
    name: string;
    imageUrl: {
      url: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  


  export interface Management {
    id: number;
    bannerImage: {url: string};
    designation: string;
    name: string;
    imageUrl: {
      url: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  export interface Award {
    id?: number;
    awardTitle: string;
    awardDescription: string;
    awardImage?: string | { url: string };
    bannerImage?: string | { url: string };
    file?: File | null;
    previewUrl?: string | { url: string };
    bannerFile?: File | null;
    bannerPreviewUrl?: string | { url: string };
  }


  export interface Milestone {
    id?: number;
    milestoneDescription: string;
    milestoneImage?: { url: string }; 
    imageDescription: string;
    file: File | null;
    previewUrl: string;
  }

  
  export interface WhatWeOffer {
    image: string;
    title: string;
    description: string;
  }
  
  export interface HospitalData {
    id: number;
    title: string;
    aboutHospital: string;
    whatWeHave: string;
    bannerImage: string;
    createdAt: string;
    updatedAt: string;
    whatWeOffer: WhatWeOffer[];
    slidingImages: string[];
  }
  
  
  
  
  // export interface Award {
  //   id?: number; // Optional for new entries
  //   awardTitle: string;
  //   awardDescription: string;
  //   awardImage?: {
  //     url: string;
  //   };
  //   bannerImage?: {
  //     url: string;
  //   };
  // }
  