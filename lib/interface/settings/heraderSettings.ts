export interface HeaderSettings {
    id: number;
    favicon: string;
    headerLogo: string;
    siteTitle: string;
    siteURL: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface HeaderSettingsResponse {
    message: string;
    data: HeaderSettings;
  }
  