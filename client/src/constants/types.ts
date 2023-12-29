
export interface CategoryItemProps {
  item: { 
    id: number; 
    title: string; 
    img: string; }; 
  key: number; 
}

export interface ProductsProps {
  cat: string;
  sort: string;
}

export interface ProductItemProps{
  item: ProductData
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
  quantity?: number;
}

export interface SortBarProps {
  cat: string;
  onInputChange: (value: string) => void;
}

export interface CartState {
  products: ProductData[];
  quantity: number;
  totalPrice: number;
  deliveryPrice: number,
  discount: number,
}

export interface UserData {
  _id: string,
  username: string,
  password: string,
  isAdmin: boolean,
  createdAt: Date,
  updatedAt:Date,
}

export interface UserState {
  currentUser: UserData | null;
  isFetching: boolean;
  error: boolean
}

export interface CartItemProps {
  item: ProductData;
}