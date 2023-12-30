
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
  productId?: string;
  title: string;
  decription: string;
  image: string;
  categories?: string[];
  measure: string;
  price: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  quantity: number;
}

export interface OrderProps {
  _id: string;
  createdAt: string;
  amount: number;
  products: ProductData[];
  deliveryPrice?: number,
  deliveryPlace?: string;
  discount?: number,
}


export interface SortBarProps {
  cat: string;
  onInputChange: (value: string) => void;
}

export interface CartState {
  products: ProductData[];
  quantity: number;
  totalPrice: number;
  subtotalPrice: number;
  deliveryPrice: number,
  deliveryPlace: string;
  discount: number,
}

export interface UserData {
  _id?: string,
  username?: string,
  email: string,
  password: string,
  isAdmin?: boolean,
  createdAt?: Date,
  updatedAt?:Date,
  accessToken?: string
}

export interface UserState {
  currentUser: UserData | null;
  isFetching: boolean;
  error: boolean
}

export interface CartItemProps {
  item: ProductData;
}