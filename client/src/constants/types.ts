
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

export interface OrderData {
  _id: string;
  createdAt: string;
  amount: number;
  products: ProductData[];
  deliveryPrice?: number,
  deliveryPlace?: string;
  status?: string;
  discount?: number,
}


export interface SortBarProps {
  cat: string;
  onInputChange: (value: string) => void;
}


export interface DeliveryData {
  _id: string;
  cityName: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserData {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  accessToken?: string
}
export interface CartItemProps {
  item: ProductData;
}

export interface CategoryData {
  _id: string;
  title: string;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date,
}

export interface UserState {
  currentUser: UserData | null;
  isFetching: boolean;
  isAdmin: boolean;
  error: boolean
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

export interface AdmState {
  orders: OrderData[] ;
  categories: CategoryData[];
  products: ProductData[];
  delivery: DeliveryData[];
}
