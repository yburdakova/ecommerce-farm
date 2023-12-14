

export interface CategoryItemProps {
  item: { 
    id: number; 
    title: string; 
    img: string; }; 
  key: number; 
}

export interface ProductItemProps{
  item: {
    _id: string;
    image: string;
    title: string;
    price: number;
  }
}

export interface ProductsProps {
  cat: string;
  sort: string;
}

export interface ProductData {
  _id?: string;
  title: string;
  decription: string;
  image: string;
  categories?: string[];
  measure: string;
  price: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SortBarProps {
  cat: string;
  onInputChange: (value: string) => void;
}

