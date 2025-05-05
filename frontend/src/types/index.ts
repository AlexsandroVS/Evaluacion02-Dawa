export interface Product {
    id: number;
    name: string;
    price: string;
    provider_id: number;
    provider_name?: string;
    image_path: string;
  }
  
  export interface Provider {
    id: number;
    name: string;
  }
  