
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

interface UserData {
    username: {
        type: string,
        required: true,
        unique: true
    },
    email:{
        type: string,
        required: true,
        unique: true
    },
    password:{
        type: string,
        required: true
    },
    isAdmin: {
        type: boolean,
        default: false
    }
}

export interface UserState {
  currentUser: UserData;
  isFetching: boolean;
  error: boolean
}

export interface CartItemProps {
  item: ProductData;
}